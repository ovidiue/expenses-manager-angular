import { Injectable } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { TagService } from '../../services/tag.service';
import { CategoryService } from '../../services/category.service';
import { Expense } from '../../models/expense';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from '../../models/category';
import { Tag } from '../../models/tag';
import { TABLE_DEFAULTS } from '../../utils/table-options';
import { SelectItem } from 'primeng/api';
import { map, pluck, tap } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ExpenseDetailService {
  private _categories: BehaviorSubject<SelectItem[]> = new BehaviorSubject<SelectItem[]>([]);
  private _tags: BehaviorSubject<SelectItem[]> = new BehaviorSubject<SelectItem[]>([]);

  constructor(
      private expenseService: ExpenseService,
      private tagService: TagService,
      private categoryService: CategoryService,
  ) {
    this.loadTags();
    this.loadCategories();
  }

  getExpense(id: number) {
    return this.expenseService.get(id)
    .pipe(
        tap(exp => {
          if (exp.dueDate) {
            exp.dueDate = moment(exp.dueDate).toDate();
          }
        })
    );
  }

  getTags(): Observable<SelectItem[]> {
    return this._tags.asObservable();
  }

  getCategories(): Observable<SelectItem[]> {
    return this._categories.asObservable();
  }

  saveExpense(expense: Expense) {
    return this.expenseService.save(expense);
  }

  private loadTags() {
    this.tagService.getAll(TABLE_DEFAULTS.maxSize)
    .pipe(
        pluck('content'),
        map((tags: Tag[]) => tags.map(tag => ({label: tag.name, value: tag})
        )))
    .subscribe((tags: SelectItem[]) => this._tags.next(tags));
  }

  private loadCategories() {
    this.categoryService.getAll(TABLE_DEFAULTS.maxSize)
    .pipe(
        pluck('content'),
        map((categories: Category[]) => categories.map(cat => ({label: cat.name, value: cat}),
        )))
    .subscribe((cats: SelectItem[]) => this._categories.next(cats));
  }
}

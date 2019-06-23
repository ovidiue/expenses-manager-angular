import {Injectable} from '@angular/core';
import {ExpenseService} from '../../services/expense.service';
import {TagService} from '../../services/tag.service';
import {CategoryService} from '../../services/category.service';
import {LazyLoadEvent} from 'primeng/api';
import {Expense} from '../../models/expense';

@Injectable({
  providedIn: 'root'
})
export class ExpenseDetailService {
  constructor(
    private expenseService: ExpenseService,
    private tagService: TagService,
    private categoryService: CategoryService,
  ) {
  }

  getExpense(id: number) {
    return this.expenseService.get(id);
  }

  getTags(event: LazyLoadEvent) {
    return this.tagService.getAll(event);
  }

  getCategories(event: LazyLoadEvent) {
    return this.categoryService.getCategories(event);
  }

  saveExpense(expense: Expense) {
    return this.expenseService.save(expense);
  }
}

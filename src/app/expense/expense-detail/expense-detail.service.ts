import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryService, ExpenseService, TagService } from '@core/services';
import { Category, Expense, Tag } from '@models/interfaces';
import { MESSAGES } from '@utils/messages';
import { TABLE_DEFAULTS } from '@utils/table-options';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { SelectItem } from 'primeng/api';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, finalize, map, pluck, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ExpenseDetailService {
  private _categories: BehaviorSubject<SelectItem[]> = new BehaviorSubject<
    SelectItem[]
  >([]);
  private _tags: BehaviorSubject<SelectItem[]> = new BehaviorSubject<
    SelectItem[]
  >([]);
  private _loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(
    private expenseService: ExpenseService,
    private tagService: TagService,
    private categoryService: CategoryService,
    private readonly toastr: ToastrService
  ) {
    this.loadTags();
    this.loadCategories();
  }

  public getLoadingState(): Observable<boolean> {
    return this._loading.asObservable();
  }

  getExpense(id: number) {
    this._loading.next(true);

    return this.expenseService.get(id).pipe(
      catchError((err: HttpErrorResponse) => {
        this.toastr.error(err.message, MESSAGES.ERROR);

        return throwError(err);
      }),
      tap((exp: Expense) => {
        if (exp.dueDate) {
          exp.dueDate = moment(exp.dueDate).toDate();
        }
      }),
      finalize(() => this._loading.next(false))
    );
  }

  getTags(): Observable<SelectItem[]> {
    return this._tags.asObservable();
  }

  getCategories(): Observable<SelectItem[]> {
    return this._categories.asObservable();
  }

  saveExpense(expense: Expense) {
    this._loading.next(true);

    return this.expenseService.save(expense).pipe(
      catchError((err: HttpErrorResponse) => {
        this.toastr.error(err.message, MESSAGES.ERROR);

        return throwError(err);
      }),
      tap(() => {
        this.toastr.success(MESSAGES.EXPENSE.ADD, 'Expense');
      }),
      finalize(() => this._loading.next(false))
    );
  }

  updateExpense(expense: Expense) {
    this._loading.next(true);

    return this.expenseService.update(expense).pipe(
      catchError((err: HttpErrorResponse) => {
        this.toastr.error(err.message, MESSAGES.ERROR);

        return throwError(err);
      }),
      tap((resp) => {
        this.toastr.success(MESSAGES.EXPENSE.UPDATE, 'Expense');
      }),
      finalize(() => this._loading.next(false))
    );
  }

  private loadTags() {
    this.tagService
      .getAll(TABLE_DEFAULTS.maxSize)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.toastr.error(err.message, MESSAGES.ERROR);

          return throwError(err);
        }),
        pluck('content'),
        map((tags: Tag[]) =>
          tags.map((tag) => ({ label: tag.name, value: tag }))
        )
      )
      .subscribe((tags: SelectItem[]) => this._tags.next(tags));
  }

  private loadCategories() {
    this.categoryService
      .getAll(TABLE_DEFAULTS.maxSize)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.toastr.error(err.message, MESSAGES.ERROR);

          return throwError(err);
        }),
        pluck('content'),
        map((categories: Category[]) =>
          categories.map((cat) => ({ label: cat.name, value: cat }))
        )
      )
      .subscribe((cats: SelectItem[]) => this._categories.next(cats));
  }
}

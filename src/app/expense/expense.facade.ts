import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, finalize, map, tap } from 'rxjs/operators';

import { LazyLoadEvent } from 'primeng/api';

import { Expense, ExpenseFilter, Rate, ServerResp } from '@models/interfaces';

import { MESSAGES } from '@utils/messages';

import { CategoryFacade } from '../category/category.facade';
import { TagFacade } from '../tag/tag.facade';

import { ExpenseService, RateService } from '@core/services';
import { DateTime } from 'luxon';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ExpenseFacade {
  get loading$() {
    return this._loading$.asObservable();
  }

  get expenses$() {
    return this._expenses$.asObservable();
  }

  get total$() {
    return this._total$.asObservable();
  }

  get isModalVisible$() {
    return this._visibleModal$.asObservable();
  }
  private _visibleModal$ = new BehaviorSubject<boolean>(false);
  private event: LazyLoadEvent = null;

  private _loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  private _expenses$ = new BehaviorSubject<Expense[]>([]);

  private _total$ = new BehaviorSubject<number>(0);
  categories$ = this.categoryFacade.categories$;
  tags$ = this.tagFacade.tags$;

  constructor(
    private readonly expenseService: ExpenseService,
    private readonly rateService: RateService,
    private readonly categoryFacade: CategoryFacade,
    private readonly tagFacade: TagFacade,
    private readonly toastr: ToastrService
  ) {
    this.getExpenses(null);
  }

  getModalVisible() {
    return this._visibleModal$.asObservable();
  }

  setModalVisibility(value: boolean) {
    this._visibleModal$.next(value);
  }

  getExpenses(event: LazyLoadEvent, expenseFilter?: ExpenseFilter): void {
    this.setLoading(true);
    this.event = event;

    this.expenseService
      .getAll(event, expenseFilter)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.toastr.error(err.message, MESSAGES.ERROR);

          return throwError(err);
        }),
        map((resp) => ({ data: resp.data || [], total: resp.total || 0 })),
        finalize(() => this.setLoading(false))
      )
      .subscribe((result) => {
        this._expenses$.next(result.data);
        this._total$.next(result.total || 0);
      });
  }

  setCategoryApi(expIds: number[], catId: number) {
    this.setLoading(true);

    this.expenseService
      .setCategory(expIds, catId)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.toastr.error(err.message, MESSAGES.ERROR);

          return throwError(err);
        }),
        finalize(() => this.setLoading(false))
      )
      .subscribe(() => {
        this.getExpenses(this.event);
      });
  }

  deleteExpensesApi(ids: number[], withRates: boolean) {
    this.setLoading(true);
    this.setModalVisibility(true);

    this.expenseService
      .delete(ids, withRates)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.toastr.error(err.message, MESSAGES.ERROR);

          return throwError(err);
        }),
        tap(() => {
          const msg = ids.length
            ? MESSAGES.EXPENSE.DELETE_MULTIPLE
            : MESSAGES.EXPENSE.DELETE_SINGLE;
          this.toastr.success(msg, 'Delete');
        }),
        finalize(() => {
          this.setLoading(false);
          this.setModalVisibility(false);
        })
      )
      .subscribe(() => this.getExpenses(this.event));
  }

  getRatesByExpenseIdApi(id: number): Observable<ServerResp<Rate[]>> {
    return this.rateService.getRatesByExpenseId(id).pipe(
      catchError((err: HttpErrorResponse) => {
        this.toastr.error(err.message, MESSAGES.ERROR);

        return throwError(err);
      })
    );
  }

  mapToExpenseFilter(obj: any): ExpenseFilter {
    const expenseFilter: ExpenseFilter = {};

    if (obj.amount) {
      obj.amountFrom = obj.amount[0];
      obj.amountTo = obj.amount[1];
      delete obj.amount;
    }

    if (obj.createdBetween) {
      obj.createdFrom = DateTime.fromJSDate(obj.createdBetween[0]).toFormat(
        'DD-MM-YYYY'
      );
      obj.createdTo = DateTime.fromJSDate(obj.createdBetween[1]).toFormat(
        'DD-MM-YYYY'
      );
      delete obj.createdBetween;
    }

    if (obj.dueBetween) {
      obj.dueDateFrom = DateTime.fromJSDate(obj.dueBetween[0]).toFormat(
        'DD-MM-YYYY'
      );
      obj.dueDateTo = DateTime.fromJSDate(obj.dueBetween[1]).toFormat(
        'DD-MM-YYYY'
      );
      delete obj.dueBetween;
    }

    if (obj.category) {
      obj.categoryId = obj.category.id;
      delete obj.category;
    }

    if (obj.tags) {
      obj.tagIds = obj.tags.map((tag) => tag.id);
      delete obj.tags;
    }

    for (const key in obj) {
      if (
        obj[key] !== null &&
        typeof obj[key] !== 'undefined' &&
        obj[key] !== ''
      ) {
        expenseFilter[key] = obj[key];
      }
    }

    return expenseFilter;
  }

  saveExpense(expense: Expense) {
    this._loading$.next(true);

    return this.expenseService.save(expense).pipe(
      catchError((err: HttpErrorResponse) => {
        this.toastr.error(err.message, MESSAGES.ERROR);

        return throwError(err);
      }),
      tap(() => {
        this.toastr.success(MESSAGES.EXPENSE.ADD, 'Expense');
      }),
      finalize(() => this._loading$.next(false))
    );
  }

  getExpense(id: number) {
    this._loading$.next(true);

    return this.expenseService.get(id).pipe(
      catchError((err: HttpErrorResponse) => {
        this.toastr.error(err.message, MESSAGES.ERROR);

        return throwError(err);
      }),
      finalize(() => this._loading$.next(false))
    );
  }

  updateExpense(expense: Expense) {
    this._loading$.next(true);

    return this.expenseService.update(expense).pipe(
      catchError((err: HttpErrorResponse) => {
        this.toastr.error(err.message, MESSAGES.ERROR);

        return throwError(err);
      }),
      tap(() => {
        this.toastr.success(MESSAGES.EXPENSE.UPDATE, 'Expense');
      }),
      finalize(() => this._loading$.next(false))
    );
  }

  private setLoading(state: boolean): void {
    this._loading$.next(state);
  }
}

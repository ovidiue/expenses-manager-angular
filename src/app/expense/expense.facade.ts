import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ExpenseService, RateService } from '@core/services';

import { Expense } from '@models/interfaces';

import { MESSAGES } from '@utils/messages';
import { ToastrService } from 'ngx-toastr';

import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';

import { CategoryFacade } from '../category';
import { TagFacade } from '../tag';

@Injectable({
  providedIn: 'root',
})
export class ExpenseFacade {
  private _loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  get loading$() {
    return this._loading$.asObservable();
  }

  private _expenses$ = new BehaviorSubject<Expense[]>([]);
  get expenses$() {
    return this._expenses$.asObservable();
  }

  private _apiErr$ = new BehaviorSubject<boolean>(false);
  get apiErr$() {
    return this._apiErr$.asObservable();
  }

  constructor(
    private readonly expenseService: ExpenseService,
    private readonly rateService: RateService,
    private readonly categoryFacade: CategoryFacade,
    private readonly tagFacade: TagFacade,
    private readonly toastr: ToastrService
  ) {}

  getExpenses() {
    this._apiErr$.next(false);

    return this.expenseService.getAll().pipe(
      tap((resp) => {
        this._expenses$.next(resp.data);
      }),
      catchError((err) => {
        console.log('catcherr', err);
        this._apiErr$.next(true);
        this._expenses$.next([]);

        return throwError(() => err);
      }),
      finalize(() => this._loading$.next(false))
    );
  }

  deleteExpensesApi(ids: number[], withRates: boolean) {
    this._loading$.next(true);

    this.expenseService
      .delete(ids, withRates)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.toastr.error(err.message, MESSAGES.ERROR);

          return throwError(() => err);
        }),
        tap(() => {
          const msg = ids.length
            ? MESSAGES.EXPENSE.DELETE_MULTIPLE
            : MESSAGES.EXPENSE.DELETE_SINGLE;
          this.toastr.success(msg, 'Delete');
        }),
        finalize(() => {
          this._loading$.next(false);
        })
      )
      .subscribe();
  }

  saveExpense(expense: Expense) {
    this._loading$.next(true);

    return this.expenseService.save(expense).pipe(
      catchError((err: HttpErrorResponse) => {
        this.toastr.error(err.message, MESSAGES.ERROR);

        return throwError(() => err);
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

        return throwError(() => err);
      }),
      finalize(() => this._loading$.next(false))
    );
  }

  updateExpense(expense: Expense) {
    this._loading$.next(true);

    return this.expenseService.update(expense).pipe(
      catchError((err: HttpErrorResponse) => {
        this.toastr.error(err.message, MESSAGES.ERROR);

        return throwError(() => err);
      }),
      tap(() => {
        this.toastr.success(MESSAGES.EXPENSE.UPDATE, 'Expense');
      }),
      finalize(() => this._loading$.next(false))
    );
  }
}

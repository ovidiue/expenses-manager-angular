import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Expense } from '@models/expense';
import { ExpenseFilter } from '@models/filters/expense-filter';
import { ServerResp } from '@models/interfaces/server-resp';
import { Rate } from '@models/rate';
import { ExpenseService } from '@services/expense.service';
import { RateService } from '@services/rate.service';
import { MESSAGES } from '@utils/messages';
import { ToastrService } from 'ngx-toastr';
import { LazyLoadEvent } from 'primeng/api';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExpensesDataService {
  private _loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly expenseService: ExpenseService,
    private readonly rateService: RateService,
    private readonly toastr: ToastrService
  ) {
  }

  public getLoadingState(): Observable<boolean> {
    return this._loading.asObservable();
  }

  getExpenses(event: LazyLoadEvent, expenseFilter?: ExpenseFilter): Observable<ServerResp<Expense>> {
    this.setLoading(true);

    return this.expenseService.getAll(event, expenseFilter)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.toastr.error(err.message, MESSAGES.ERROR);

          return throwError(err);
        }),
        finalize(() => this.setLoading(false))
      );
  }

  setCategory(expIds: number[], catId: number) {
    this.setLoading(true);

    return this.expenseService.setCategory(expIds, catId)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.toastr.error(err.message, MESSAGES.ERROR);

          return throwError(err);
        }),
        finalize(() => this.setLoading(false))
      );
  }

  deleteExpenses(ids: number[], withRates: boolean) {
    this.setLoading(true);

    return this.expenseService.delete(ids, withRates)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.toastr.error(err.message, MESSAGES.ERROR);

          return throwError(err);
        }),
        tap((resp) => {
          const msg = ids.length ? MESSAGES.EXPENSE.DELETE_MULTIPLE : MESSAGES.EXPENSE.DELETE_SINGLE;
          this.toastr.success(msg, 'Delete');
        }),
        finalize(() => this.setLoading(false))
      );
  }

  getRatesByExpenseId(id: number): Observable<ServerResp<Rate[]>> {
    return this.rateService.getRatesByExpenseId(id)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.toastr.error(err.message, MESSAGES.ERROR);

          return throwError(err);
        }),
      );
  }

  private setLoading(state: boolean): void {
    this._loading.next(state);
  }
}

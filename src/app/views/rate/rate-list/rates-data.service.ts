import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExpenseService, RateService } from '@core/services';
import { Expense } from '@models/expense';
import { Rate } from '@models/rate';
import { TABLE_DEFAULTS } from '@utils/table-options';
import { ToastrService } from 'ngx-toastr';
import { LazyLoadEvent } from 'primeng/api';
import { BehaviorSubject, combineLatest, Observable, throwError } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RatesDataService {
  private _rates: BehaviorSubject<Rate[]> = new BehaviorSubject([]);
  private _expenses: BehaviorSubject<Expense[]> = new BehaviorSubject([]);
  private _total: BehaviorSubject<Number> = new BehaviorSubject(0);
  private _loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(
    private rateService: RateService,
    private expenseService: ExpenseService,
    private toastr: ToastrService
  ) {
    this.loadServerData(TABLE_DEFAULTS.query);
    this.loadServerExpenses();
  }

  getData(event: LazyLoadEvent) {
    this.loadServerData(event);
    return combineLatest([
      this._rates.asObservable(),
      this._total.asObservable(),
    ]).pipe(
      map(([rates, total]) => ({
        rates,
        total,
      }))
    );
  }

  getRatesByExpenseIds(ids: number[], event: LazyLoadEvent) {
    return this.rateService.getRatesByExpenseIds(ids, event);
  }

  getRates(event: LazyLoadEvent): Observable<Rate[]> {
    this.loadServerData(event);
    return this._rates.asObservable();
  }

  getTotal(): Observable<Number> {
    return this._total.asObservable();
  }

  deleteRates(ids: number[]) {
    this.setLoadingState(true);
    return this.rateService
      .deleteRates(ids)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.toastr.error(err.message, 'Failed deleting rates');

          return throwError(err);
        }),
        finalize(() => this.setLoadingState(false))
      )
      .subscribe((respIds) => {
        const remainingRates = this._rates
          .getValue()
          .filter((rate) => !respIds.includes(rate.id));
        this._rates.next(remainingRates);
        const newTotalValue = Number(this._total.getValue()) - respIds.length;
        this._total.next(newTotalValue);
        this.toastr.success('', 'Deleted rates');

        return respIds;
      });
  }

  getExpenses(): Observable<Expense[]> {
    return this._expenses.asObservable();
  }

  loadServerData(event: LazyLoadEvent): void {
    this.setLoadingState(true);
    this.rateService
      .getRates(event)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.toastr.error(err.message, 'Load rates failed');
          return throwError(err);
        }),
        finalize(() => this.setLoadingState(false))
      )
      .subscribe((resp) => {
        const { content, totalElements } = resp;
        this._rates.next(content);
        this._total.next(totalElements);
      });
  }

  loadServerExpenses() {
    this.setLoadingState(true);
    this.expenseService
      .getAll(TABLE_DEFAULTS.query)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.toastr.error(err.message, 'Failed fetching expenses');
          return throwError(err);
        }),
        finalize(() => this.setLoadingState(false))
      )
      .subscribe((resp) => this._expenses.next(resp.content));
  }

  public getLoadingState(): Observable<boolean> {
    return this._loading.asObservable();
  }

  private setLoadingState(state: boolean): void {
    this._loading.next(state);
  }
}

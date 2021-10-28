import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';

import { LazyLoadEvent } from 'primeng/api';

import { Expense, Rate } from '@models/interfaces';

import { ExpenseService, RateService } from '@core/services';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class RatesFacade {
  get rates$() {
    return this._rates$.asObservable();
  }

  get expenses$() {
    return this._expenses$.asObservable();
  }

  get total$() {
    return this._total$.asObservable();
  }

  get loading$() {
    return this._loading$.asObservable();
  }

  private _rates$: BehaviorSubject<Rate[]> = new BehaviorSubject([]);

  private _expenses$: BehaviorSubject<Expense[]> = new BehaviorSubject([]);

  private _total$: BehaviorSubject<Number> = new BehaviorSubject(0);

  private _loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  constructor(
    private readonly _rateService: RateService,
    private readonly _expenseService: ExpenseService,
    private readonly _toastrService: ToastrService
  ) {}

  getRatesByExpenseIds(ids: number[], event: LazyLoadEvent) {
    return this._rateService.getRatesByExpenseIds(ids, event);
  }

  deleteRates(ids: number[]) {
    this.setLoadingState(true);

    return this._rateService
      .deleteRates(ids)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this._toastrService.error(err.message, 'Failed deleting rates');

          return throwError(err);
        }),
        finalize(() => this.setLoadingState(false))
      )
      .subscribe(() => {
        this._toastrService.success('', 'Deleted rates');

        this.getRates(null);
      });
  }

  getRates(event: LazyLoadEvent): void {
    this.setLoadingState(true);
    this._rateService
      .getRates(event)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this._toastrService.error(err.message, 'Load rates failed');

          return throwError(err);
        }),
        finalize(() => this.setLoadingState(false))
      )
      .subscribe((resp) => {
        const { data, total } = resp;
        this._rates$.next(data);
        this._total$.next(total);
      });
  }

  getRateByName(name: string) {
    this.setLoadingState(true);

    return this._rateService.getByName(name).pipe(
      catchError((err: HttpErrorResponse) => {
        this._toastrService.error(err.message, `Get rate ${name} failed`);

        return throwError(err);
      }),
      finalize(() => this.setLoadingState(false))
    );
  }

  saveRate(rate: Rate) {
    this.setLoadingState(true);

    return this._rateService.save(rate).pipe(
      catchError((err: HttpErrorResponse) => {
        this._toastrService.error(
          err.message,
          `Save rate ${rate.amount} failed`
        );

        return throwError(err);
      }),
      tap(() => this._toastrService.success('', 'Added rate')),
      finalize(() => this.setLoadingState(false))
    );
  }

  getRate(id: number) {
    this.setLoadingState(true);

    return this._rateService.get(id).pipe(
      catchError((err: HttpErrorResponse) => {
        this._toastrService.error(err.message, `Get rate ${id} failed`);

        return throwError(err);
      }),
      finalize(() => this.setLoadingState(false))
    );
  }

  updateRate(rate: Rate, expenseId: string, rateAmount: string) {
    this.setLoadingState(true);

    return this._rateService.update(rate, expenseId, rateAmount).pipe(
      catchError((err: HttpErrorResponse) => {
        this._toastrService.error(
          err.message,
          `Update rate ${rate.amount} failed`
        );

        return throwError(err);
      }),
      tap(() => this._toastrService.success('', 'Updated rate')),
      finalize(() => this.setLoadingState(false))
    );
  }

  private setLoadingState(state: boolean): void {
    this._loading$.next(state);
  }
}

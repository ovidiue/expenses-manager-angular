import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExpenseService, RateService } from '@core/services';
import { Expense, Rate } from '@models/interfaces';
import { ToastrService } from 'ngx-toastr';
import { LazyLoadEvent } from 'primeng/api';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RatesFacade {
  constructor(
    private rateService: RateService,
    private expenseService: ExpenseService,
    private toastr: ToastrService
  ) {}

  private _rates$: BehaviorSubject<Rate[]> = new BehaviorSubject([]);

  get rates$() {
    return this._rates$.asObservable();
  }

  private _expenses$: BehaviorSubject<Expense[]> = new BehaviorSubject([]);

  get expenses$() {
    return this._expenses$.asObservable();
  }

  private _total$: BehaviorSubject<Number> = new BehaviorSubject(0);

  get total$() {
    return this._total$.asObservable();
  }

  private _loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  get loading$() {
    return this._loading$.asObservable();
  }

  getRatesByExpenseIds(ids: number[], event: LazyLoadEvent) {
    return this.rateService.getRatesByExpenseIds(ids, event);
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
      .subscribe(() => {
        this.toastr.success('', 'Deleted rates');

        this.getRates(null);
      });
  }

  getRates(event: LazyLoadEvent): void {
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
        const { data, total } = resp;
        this._rates$.next(data);
        this._total$.next(total);
      });
  }

  getRateByName(name: string) {
    this.setLoadingState(true);

    return this.rateService.getByName(name).pipe(
      catchError((err: HttpErrorResponse) => {
        this.toastr.error(err.message, `Get rate ${name} failed`);

        return throwError(err);
      }),
      finalize(() => this.setLoadingState(false))
    );
  }

  saveRate(rate: Rate) {
    this.setLoadingState(true);

    return this.rateService.save(rate).pipe(
      catchError((err: HttpErrorResponse) => {
        this.toastr.error(err.message, `Save rate ${rate.amount} failed`);

        return throwError(err);
      }),
      tap(() => this.toastr.success('', 'Added rate')),
      finalize(() => this.setLoadingState(false))
    );
  }

  getRate(id: number) {
    this.setLoadingState(true);

    return this.rateService.get(id).pipe(
      catchError((err: HttpErrorResponse) => {
        this.toastr.error(err.message, `Get rate ${id} failed`);

        return throwError(err);
      }),
      finalize(() => this.setLoadingState(false))
    );
  }

  updateRate(rate: Rate, expenseId: string, rateAmount: string) {
    this.setLoadingState(true);

    return this.rateService.update(rate, expenseId, rateAmount).pipe(
      catchError((err: HttpErrorResponse) => {
        this.toastr.error(err.message, `Update rate ${rate.amount} failed`);

        return throwError(err);
      }),
      tap(() => this.toastr.success('', 'Updated rate')),
      finalize(() => this.setLoadingState(false))
    );
  }

  private setLoadingState(state: boolean): void {
    this._loading$.next(state);
  }
}

import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExpenseService, RateService } from '@core/services';
import { Expense, Rate } from '@models/interfaces';
import { ToastrService } from 'ngx-toastr';
import { LazyLoadEvent } from 'primeng/api';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, finalize, map, pluck, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RateDetailService {
  private _loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(
    private rateService: RateService,
    private expenseService: ExpenseService,
    private readonly toastr: ToastrService
  ) {}

  getRate(id: number) {
    this.setLoading(true);

    return this.rateService.get(id).pipe(
      catchError((err: HttpErrorResponse) => {
        this.toastr.error(err.message, `Get rate ${id} failed`);

        return throwError(err);
      }),
      finalize(() => this.setLoading(false))
    );
  }

  getRateByName(name: string) {
    this.setLoading(true);

    return this.rateService.getByName(name).pipe(
      catchError((err: HttpErrorResponse) => {
        this.toastr.error(err.message, `Get rate ${name} failed`);

        return throwError(err);
      }),
      finalize(() => this.setLoading(false))
    );
  }

  saveRate(rate: Rate) {
    this.setLoading(true);

    return this.rateService.save(rate).pipe(
      catchError((err: HttpErrorResponse) => {
        this.toastr.error(err.message, `Save rate ${rate.amount} failed`);

        return throwError(err);
      }),
      tap(() => this.toastr.success('', 'Added rate')),
      finalize(() => this.setLoading(false))
    );
  }

  updateRate(rate: Rate, expenseId: string, rateAmount: string) {
    this.setLoading(true);

    return this.rateService.update(rate, expenseId, rateAmount).pipe(
      catchError((err: HttpErrorResponse) => {
        this.toastr.error(err.message, `Update rate ${rate.amount} failed`);

        return throwError(err);
      }),
      tap(() => this.toastr.success('', 'Updated rate')),
      finalize(() => this.setLoading(false))
    );
  }

  getExpenses(event: LazyLoadEvent) {
    return this.expenseService.getAll(event).pipe(
      catchError((err: HttpErrorResponse) => {
        this.toastr.error(err.message, 'Failed fetching expenses');

        return throwError(err);
      }),
      pluck('content'),
      map((exp: Expense[]) => exp.map((el) => ({ label: el.name, value: el })))
    );
  }

  public getLoadingState(): Observable<boolean> {
    return this._loading.asObservable();
  }

  private setLoading(state: boolean): void {
    this._loading.next(state);
  }
}

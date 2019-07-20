import {Injectable} from '@angular/core';
import {RateService} from '../../services/rate.service';
import {ExpenseService} from '../../services/expense.service';
import {LazyLoadEvent} from 'primeng/api';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {Rate} from '../../models/rate';
import {Expense} from '../../models/expense';
import {map, tap} from 'rxjs/operators';
import {TABLE_DEFAULTS} from '../../utils/table-options';

@Injectable({
  providedIn: 'root'
})
export class RatesDataService {
  private _rates: BehaviorSubject<Rate[]> = new BehaviorSubject([]);
  private _expenses: BehaviorSubject<Expense[]> = new BehaviorSubject([]);
  private _total: BehaviorSubject<Number> = new BehaviorSubject(0);

  constructor(
    private rateService: RateService,
    private expenseService: ExpenseService
  ) {
    this.loadServerData(TABLE_DEFAULTS.query);
  }

  getData(event: LazyLoadEvent) {
    this.loadServerData(event);
    return combineLatest([
      this._rates.asObservable(),
      this._expenses.asObservable(),
      this._total.asObservable()
    ])
    .pipe(
      map(([rates, expenses, total]) => (
        {
          rates,
          expenses,
          total
        }
      ))
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
    return this.rateService.deleteRates(ids)
    .pipe(
      tap(respIds => {
        const remainingRates = this._rates.getValue()
        .filter(rate => !respIds.includes(rate.id));
        this._rates.next(remainingRates);
        const newTotalValue = Number(this._total.getValue()) - respIds.length;
        this._total.next(newTotalValue);
        return respIds;
      })
    );
  }

  getExpenses(): Observable<Expense[]> {
    return this._expenses.asObservable();
  }

  loadServerData(event: LazyLoadEvent): void {
    this.rateService.getRates(event)
    .subscribe(resp => {
      const {content, totalElements} = resp;
      this._rates.next(content);
      this._total.next(totalElements);
    });

    this.expenseService.getAll(TABLE_DEFAULTS.query)
    .subscribe(
      resp => this._expenses.next(resp.content)
    );
  }
}

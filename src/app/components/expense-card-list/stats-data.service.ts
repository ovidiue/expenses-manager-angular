import { Injectable } from '@angular/core';
import { ExpenseService } from '@core/services';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export default class StatsDataService {
  constructor(private expenseService: ExpenseService) {
  }

  round(value: number): number {
    return Math.round(value * 100) / 100;
  }

  getStats(): Observable<any> {
    return this.expenseService.getStats()
    .pipe(
        map(resp => {
          return [
            {
              key: 'Number of expenses',
              value: resp.noOfExpenses || ''
            }, {
              key: 'Maximum value for expense',
              value: this.round(resp.max) || ''
            }, {
              key: 'Lowest value for expense',
              value: this.round(resp.min) || ''
            }, {
              key: 'Average non recurrent value',
              value: this.round(resp.averageNonRecurrent) || ''
            }, {
              key: 'Average recurrent value',
              value: this.round(resp.averageRecurrent) || ''
            }, {
              key: 'Number of expenses partial payed',
              value: this.round(resp.partialPayed) || ''
            }, {
              key: ' Number of expenses payed',
              value: resp.payed || '-'
            }
          ];
        })
    );
  }
}

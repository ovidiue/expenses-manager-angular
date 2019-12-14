import { Injectable } from '@angular/core';
import { RateService } from '@services/rate.service';
import { ExpenseService } from '@services/expense.service';
import { Rate } from '@models/rate';
import { LazyLoadEvent } from 'primeng/api';
import { map, pluck } from 'rxjs/operators';
import { Expense } from '@models/expense';

@Injectable({
  providedIn: 'root'
})
export class RateDetailService {
  constructor(
      private rateService: RateService,
      private expenseService: ExpenseService) {
  }

  getRate(id: number) {
    return this.rateService.get(id);
  }

  getRateByName(name: string) {
    return this.rateService.getByName(name);
  }

  saveRate(rate: Rate) {
    return this.rateService.save(rate);
  }

  updateRate(rate: Rate, expenseId: string, rateAmount: string) {
    return this.rateService.update(rate, expenseId, rateAmount);
  }

  getExpenses(event: LazyLoadEvent) {
    return this.expenseService.getAll(event)
    .pipe(
      pluck('content'),
      map((exp: Expense[]) => exp.map(el => ({label: el.title, value: el})))
    );
  }
}

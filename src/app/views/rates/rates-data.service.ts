import {Injectable} from '@angular/core';
import {RateService} from '../../services/rate.service';
import {ExpenseService} from '../../services/expense.service';
import {LazyLoadEvent} from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class RatesDataService {
  constructor(
    private rateService: RateService,
    private expenseService: ExpenseService
  ) {
  }

  getRatesByExpenseIds(ids: number[], event: LazyLoadEvent) {
    return this.rateService.getRatesByExpenseIds(ids, event);
  }

  getRates(event: LazyLoadEvent) {
    return this.rateService.getRates(event);
  }

  getExpenses(event: LazyLoadEvent) {
    return this.expenseService.getAll(event);
  }

  deleteRates(ids: number[]) {
    return this.rateService.deleteRates(ids);
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LazyLoadEvent } from 'primeng/api';
import { ServerResp } from '@models/interfaces/server-resp';
import { Expense } from '@models/expense';
import { ExpenseFilter } from '@models/filters/expense-filter';
import { ExpenseService } from '@services/expense.service';
import { RateService } from '@services/rate.service';

@Injectable({
  providedIn: 'root'
})
export class ExpensesDataService {
  constructor(
      private expenseService: ExpenseService,
      private rateService: RateService,
  ) {
  }

  getExpenses(event: LazyLoadEvent, expenseFilter?: ExpenseFilter): Observable<ServerResp<Expense>> {
    return this.expenseService.getAll(event, expenseFilter);
  }

  setCategory(expIds: number[], catId: number) {
    return this.expenseService.setCategory(expIds, catId);
  }

  deleteExpenses(ids: number[], withRates: boolean) {
    return this.expenseService.delete(ids, withRates);
  }

  getRatesByExpenseId(id: number) {
    return this.rateService.getRatesByExpenseId(id);
  }
}

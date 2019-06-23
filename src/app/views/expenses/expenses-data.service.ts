import {Injectable} from '@angular/core';
import {ExpenseService} from '../../services/expense.service';
import {RateService} from '../../services/rate.service';
import {CategoryService} from '../../services/category.service';
import {TagService} from '../../services/tag.service';
import {LazyLoadEvent} from 'primeng/api';
import {ExpenseFilter} from '../../models/filters/expense-filter';

@Injectable({
  providedIn: 'root'
})
export class ExpensesDataService {
  constructor(
    private expenseService: ExpenseService,
    private rateService: RateService,
    private categoryService: CategoryService,
    private tagService: TagService,
  ) {
  }

  getExpenses(event: LazyLoadEvent, expenseFilter?: ExpenseFilter) {
    return this.expenseService.getAll(event, expenseFilter);
  }

  getTags(event: LazyLoadEvent) {
    return this.tagService.getAll(event);
  }

  getCategories(event: LazyLoadEvent) {
    return this.categoryService.getAll(event);
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

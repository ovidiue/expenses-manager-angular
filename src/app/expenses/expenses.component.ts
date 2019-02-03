import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Expense} from '../classes/expense';
import {ExpenseService} from '../services/expense.service';
import {RateService} from '../services/rate.service';
import {GlobalNotificationService} from '../services/global-notification.service';
import {MESSAGES} from '../utils/messages';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class ExpensesComponent implements OnInit {
  expenses: Expense[] = [];
  selectedExpenses: Expense[] = [];

  constructor(private expenseService: ExpenseService,
              private rateService: RateService,
              private confirmationService: ConfirmationService,
              private globalNotificationService: GlobalNotificationService) {
  }

  ngOnInit() {
    this.getExpenses();
  }

  getExpenses(): void {
    this.expenseService.getExpenses().subscribe(resp => {
      this.expenses = resp;
    });
  }

  confirmDeletion() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete these expenses?',
      accept: () => {
        const ids = this.selectedExpenses.map(el => el.id);
        console.log('ids to delete', ids);
        this.expenseService.deleteExpenses(ids)
        .then(() => {
          this.expenses = this.expenses.filter(ex => ids.indexOf(ex.id) < 0);
          this.globalNotificationService.add(MESSAGES.deletedExpenses);
        })
        .catch(err => this.globalNotificationService.add(MESSAGES.error));
      }
    });
  }

  onDelete(ex: Expense): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${ex.title} ?`,
      accept: () => {
        this.expenseService.deleteExpenses([ex.id])
        .then(() => {
          this.expenses = this.expenses.filter(el => el.id !== ex.id);
          this.globalNotificationService.add(MESSAGES.deletedExpense);
        })
        .catch(() => this.globalNotificationService.add(MESSAGES.error));
      }
    });
  }

  onFetchRates(exp: Expense): void {
    this.rateService.getRatesByExpenseId(exp.id).then(rates => console.log(rates));
  }

}

import {Component, OnInit} from '@angular/core';
import {ConfirmationService, DialogService, DynamicDialogConfig, MessageService} from 'primeng/api';
import {Expense} from '../classes/expense';
import {ExpenseService} from '../services/expense.service';
import {RateService} from '../services/rate.service';
import {GlobalNotificationService} from '../services/global-notification.service';
import {MESSAGES} from '../utils/messages';
import {DialogRatesComponent} from '../dialog-rates/dialog-rates.component';
import {fadeIn} from '../utils/animations/fadeIn';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
  animations: [fadeIn],
  providers: [ConfirmationService, MessageService, DialogService, DynamicDialogConfig]
})
export class ExpensesComponent implements OnInit {
  expenses: Expense[] = [];
  selectedExpenses: Expense[] = [];

  displayDelete = false;
  deletionText = '';
  selectedForDeletion: Expense;

  selectedDescription = '';

  constructor(private expenseService: ExpenseService,
              private rateService: RateService,
              public dialogService: DialogService,
              private globalNotificationService: GlobalNotificationService) {
  }

  ngOnInit() {
    this.getExpenses();
  }

  getExpenses(): void {
    this.expenseService.getExpenses().subscribe(resp => {
      this.expenses = resp || [];
    });
  }

  decideVisibilityAccordingToPayedField(): boolean {
    if (this.selectedForDeletion) {
      return this.selectedForDeletion.payed > 0;
    } else {
      return this.selectedExpenses.filter(ex => ex.payed > 0).length > 0;
    }
  }

  deleteExpense(): void {
    const idsToDelete = this.selectedForDeletion ? [this.selectedForDeletion.id] : this.selectedExpenses.map(ex => ex.id);
    this.expenseService.deleteExpenses(idsToDelete, false)
    .then(() => {
      this.resetDeletionVariables();
      this.getExpenses();
      this.globalNotificationService.add(MESSAGES.deletedExpense);
    })
    .catch(() => this.globalNotificationService.add(MESSAGES.error));
  }

  resetDeletionVariables(): void {
    this.displayDelete = false;
    this.deletionText = '';
    this.selectedForDeletion = null;
    this.selectedExpenses = [];
  }

  displayDeleteMultiple() {
    this.displayDelete = true;
    this.deletionText = 'Are you sure you want to delete following expenses:' + this.selectedExpenses.map(ex => ex.title).join(', ') + ' ?';
  }

  displayDeleteRow(ex: Expense): void {
    this.displayDelete = true;
    this.selectedForDeletion = ex;
    this.deletionText = `Are you sure you want to delete ${this.selectedForDeletion.title} ?`;
    console.log('sdasdas');
  }

  deleteExpenseAndRates(): void {
    const idsToDelete = this.selectedForDeletion ? [this.selectedForDeletion.id] : this.selectedExpenses.map(ex => ex.id);
    this.expenseService.deleteExpenses(idsToDelete, true)
    .then(() => {
      this.resetDeletionVariables();
      this.getExpenses();
      this.globalNotificationService.add(MESSAGES.deletedExpense);
    })
    .catch(() => this.globalNotificationService.add(MESSAGES.error));
  }

  fetchAndDisplayRates(exp: Expense): void {

    this.rateService.getRatesByExpenseId(exp.id).then(rates => {
      const ref = this.dialogService.open(DialogRatesComponent, <DynamicDialogConfig>{
        header: 'Rates',
        width: '70%',
        data: {
          rates: rates
        }
      });
    });
  }

}

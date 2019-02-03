import {Component, OnInit} from '@angular/core';
import {ConfirmationService, DialogService, DynamicDialogConfig, MessageService} from 'primeng/api';
import {Expense} from '../classes/expense';
import {ExpenseService} from '../services/expense.service';
import {RateService} from '../services/rate.service';
import {GlobalNotificationService} from '../services/global-notification.service';
import {MESSAGES} from '../utils/messages';
import {DialogRatesComponent} from '../dialog-rates/dialog-rates.component';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
  providers: [ConfirmationService, MessageService, DialogService, DynamicDialogConfig]
})
export class ExpensesComponent implements OnInit {
  expenses: Expense[] = [];
  selectedExpenses: Expense[] = [];
  selectedDescription = '';
  rangeValues: number[] = [10, 100];
  recurrent: boolean;

  constructor(private expenseService: ExpenseService,
              private rateService: RateService,
              public dialogService: DialogService,
              private confirmationService: ConfirmationService,
              private globalNotificationService: GlobalNotificationService) {
  }

  ngOnInit() {
    this.getExpenses();
  }

  /*@HostListener('click') onClick() {
   const self = this;
   if (this.selectedDescription.length > 0) {
   setTimeout(function () {
   self.selectedDescription = '';
   }, 500);

   }
   }*/

  onDescriptionInfo(text: string): void {
    this.selectedDescription = text;
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

    this.rateService.getRatesByExpenseId(exp.id).then(rates => {
      const ref = this.dialogService.open(DialogRatesComponent, <DynamicDialogConfig>{
        header: 'Choose a Car',
        width: '70%',
        data: {
          rates: rates
        }
      });
      console.log('ref', rates);
    });
  }

}

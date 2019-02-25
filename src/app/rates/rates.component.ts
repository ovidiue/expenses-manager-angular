import {Component, OnInit} from '@angular/core';
import {ConfirmationService, LazyLoadEvent, MessageService} from 'primeng/api';
import {Rate} from '../classes/rate';
import {RateService} from '../services/rate.service';
import {GlobalNotificationService} from '../services/global-notification.service';
import {MESSAGES} from '../utils/messages';
import {Expense} from '../classes/expense';
import {ExpenseService} from '../services/expense.service';
import {fadeIn} from '../utils/animations/fadeIn';
import {TABLE_DEFAULTS} from '../utils/table-options';

@Component({
  selector: 'app-rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.scss'],
  providers: [ConfirmationService, MessageService],
  animations: [fadeIn]
})
export class RatesComponent implements OnInit {
  rates: Rate[] = [];
  selectedExpenses: Expense[] = [];
  expenses: Expense[];
  selectedRates: Rate[] = [];

  tableDefaults = TABLE_DEFAULTS;

  tableOptions = {
    totalTableRecords: 0,
    columns: [
      {name: 'Amount', value: 'amount'},
      {name: 'Observation', value: 'observation'},
      {name: 'Creation Date', value: 'creationDate'},
      {name: 'Payed On', value: 'payedOn'},
      {name: 'Expense', value: 'expense'},
      {name: 'Expense', value: 'expense'}
    ]
  };

  selectedObservation = '';

  lastEvent: LazyLoadEvent;

  constructor(private confirmationService: ConfirmationService,
              private rateService: RateService,
              private expenseService: ExpenseService,
              private globalNotificationService: GlobalNotificationService) {
  }

  ngOnInit() {
    this.getExpenses();
  }

  filterTable($event) {
    // TODO investigate table 'filters' property to inject the dropdown value
    // TODO hit expenses endpoint => this should also be paged
    const expenses = $event.value;
    if (expenses.length) {
      const ids = expenses.map(ex => ex.id);
      this.rateService.getRatesByExpenseIds(ids, this.lastEvent).then(rates => this.rates = rates);
    } else {
      this.getRates(TABLE_DEFAULTS.query);
    }
  }

  getRates(event: LazyLoadEvent): void {
    this.rateService
    .getRates(event)
    .then(resp => {
      this.rates = resp.content;
      this.tableOptions.totalTableRecords = resp.totalElements;
      this.tableDefaults.loading = false;
      this.lastEvent = event;
    });
  }

  getExpenses(): void {
    this.expenseService.getExpenses(TABLE_DEFAULTS.maxSize)
    .then(resp => this.expenses = resp.content);
  }

  confirmDeletion() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete these rates?',
      accept: () => {
        // TODO check map warning
        const ids = this.selectedRates.map(el => el.id);
        this.rateService.deleteRates(ids)
        .then(() => {
          this.getRates(this.lastEvent);
          this.globalNotificationService.add(MESSAGES.deletedRates);
        })
        .catch(err => this.globalNotificationService.add(MESSAGES.error));
      }
    });
  }

  onDelete(rate: Rate): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${rate.amount} ?`,
      accept: () => {
        this.rateService.deleteRates([rate.id])
        .then(() => {
          this.getRates(this.lastEvent);
          this.globalNotificationService.add(MESSAGES.deletedRate);
        })
        .catch(() => this.globalNotificationService.add(MESSAGES.error));
      }
    });
  }

}

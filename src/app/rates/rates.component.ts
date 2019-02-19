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
  rates: Rate[];
  selectedExpenses: Expense[] = [];
  expenses: Expense[];
  selectedRates: Rate[] = [];

  totalTableRecords: number;
  loading = true;
  rowsPerPageOptions = TABLE_DEFAULTS.rowsPerPageOptions;

  selectedObservation = '';

  rows: number;
  first: number;
  sortField: string;
  sortOrder: number;

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
    console.log('event', $event);
    const expenses = $event.value;
    if (expenses.length) {
      const ids = expenses.map(ex => ex.id);
      const event = this.getStoredTableParams();
      console.log('built event', event);
      this.rateService.getRatesByExpenseIds(ids, event).then(rates => this.rates = rates);
    } else {
      this.getRates(TABLE_DEFAULTS.query);
    }
  }

  private getStoredTableParams(): LazyLoadEvent {
    const event: LazyLoadEvent = {
      rows: this.rows,
      sortField: this.sortField,
      sortOrder: this.sortOrder,
      first: this.first
    };

    return event;
  }

  getRates(event: LazyLoadEvent): void {
    this.rateService
    .getRates(event)
    .then(resp => {
      this.rates = resp.content;
      this.totalTableRecords = resp.totalElements;
      this.loading = false;
      this.rows = event.rows;
      this.first = event.first;
      this.sortOrder = event.sortOrder;
      this.sortField = event.sortField;
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
        const ids = this.selectedRates.map(el => el.id);
        this.rateService.deleteRates(ids)
        .then(() => {
          this.rates = this.rates.filter(rate => ids.indexOf(rate.id) < 0);
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
          this.rates = this.rates.filter(el => el.id !== rate.id);
          this.globalNotificationService.add(MESSAGES.deletedRate);
        })
        .catch(() => this.globalNotificationService.add(MESSAGES.error));
      }
    });
  }

}

import {Component, OnInit} from '@angular/core';
import {ConfirmationService, LazyLoadEvent, MessageService} from 'primeng/api';
import {Rate} from '../../models/rate';
import {GlobalNotificationService} from '../../services/global-notification.service';
import {MESSAGES} from '../../utils/messages';
import {Expense} from '../../models/expense';
import {fadeIn} from '../../utils/animations/fadeIn';
import {TABLE_DEFAULTS} from '../../utils/table-options';
import {RatesDataService} from './rates-data.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.scss'],
  providers: [ConfirmationService, MessageService],
  animations: [fadeIn]
})
export class RatesComponent implements OnInit {
  rates$: Observable<Rate[]>;
  total$: Observable<Number>;
  expenses$: Observable<Expense[]>;

  selectedExpenses: Expense[] = [];
  expenses: Expense[];
  selectedRates: Rate[] = [];

  tableDefaults = TABLE_DEFAULTS;

  tableOptions = {
    columns: [
      {name: 'Amount', value: 'amount'},
      {name: 'Observation', value: 'observation'},
      {name: 'Creation Date', value: 'creationDate'},
      {name: 'Payed On', value: 'payedOn'},
      {name: 'Expense', value: 'expense'}
    ]
  };

  selectedObservation = '';

  lastEvent: LazyLoadEvent;

  constructor(
    private confirmationService: ConfirmationService,
    private service: RatesDataService,
    private globalNotificationService: GlobalNotificationService) {
  }

  ngOnInit() {
    this.rates$ = this.service.getRates(TABLE_DEFAULTS.query);
    this.total$ = this.service.getTotal();
    this.expenses$ = this.service.getExpenses();
  }

  clearExpenseFilter(): void {
    this.selectedExpenses = [];
    this.service.getRates(this.lastEvent);
  }

  filterTable($event) {
    // TODO investigate table 'filters' property to inject the dropdown value
    // TODO hit expenses endpoint => this should also be paged
    const expenses = $event.value;
    if (expenses.length) {
      const ids = expenses.map(ex => ex.id);
      this.service.getRatesByExpenseIds(ids, this.lastEvent).subscribe(rates => this.rates$ = rates);
    } else {
      this.service.getRates(TABLE_DEFAULTS.query);
    }
  }

  confirmDeletion() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete these rates?',
      accept: () => {
        // TODO check map warning
        const ids = this.selectedRates.map(el => el.id);
        this.service.deleteRates(ids)
        .subscribe(() => {
          this.globalNotificationService.add(MESSAGES.RATE.DELETE_MULTIPLE);
        }, () => this.globalNotificationService.add(MESSAGES.ERROR));
      }
    });
  }

  onDelete(rate: Rate): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${rate.amount} ?`,
      accept: () => {
        this.service.deleteRates([rate.id])
        .subscribe(() => {
          this.globalNotificationService.add(MESSAGES.RATE.DELETE_SINGLE);
        }, () => this.globalNotificationService.add(MESSAGES.ERROR));
      }
    });
  }

}

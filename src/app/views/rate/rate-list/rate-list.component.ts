import { Component, OnInit } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { RatesDataService } from './rates-data.service';
import { Observable } from 'rxjs';
import { fadeIn } from '@utils/animations/fadeIn';
import { Expense } from '@models/expense';
import { Rate } from '@models/rate';
import { TABLE_DEFAULTS } from '@utils/table-options';

@Component({
  selector: 'app-rates',
  templateUrl: './rate-list.component.html',
  styleUrls: ['./rate-list.component.scss'],
  providers: [ConfirmationService, MessageService, RatesDataService],
  animations: [fadeIn]
})
export class RateListComponent implements OnInit {

  pageData$: Observable<any>;
  expenses$: Observable<Expense[]>;

  selectedExpenses: Expense[] = [];
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
  ) {
  }

  ngOnInit() {
    this.pageData$ = this.service.getData(TABLE_DEFAULTS.query);
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
    /*if (expenses.length) {
      const ids = expenses.map(ex => ex.id);
      this.service.getRatesByExpenseIds(ids, this.lastEvent).subscribe(rates => this.pageData$.rates = rates);
    } else {
      this.service.getRates(TABLE_DEFAULTS.query);
    }*/
  }

  confirmDeletion() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete these rates?',
      accept: () => {
        // TODO check map warning
        const ids = this.selectedRates.map(el => el.id);
        this.service.deleteRates(ids);
      }
    });
  }

  onDelete(rate: Rate): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${rate.amount} ?`,
      accept: () => {
        this.service.deleteRates([rate.id]);
      }
    });
  }

}

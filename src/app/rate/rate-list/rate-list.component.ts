import { Component, OnInit } from '@angular/core';
import { Expense, Rate } from '@models/interfaces';
import { fadeIn } from '@utils/animations/fadeIn';
import { TABLE_DEFAULTS } from '@utils/table-options';
import { ConfirmationService, LazyLoadEvent, MessageService, } from 'primeng/api';
import { Observable } from 'rxjs';

import { RatesFacade } from '../rates.facade';
import { ExpenseService } from '@core/services';

@Component({
  selector: 'app-rates',
  templateUrl: './rate-list.component.html',
  styleUrls: ['./rate-list.component.scss'],
  providers: [ConfirmationService, MessageService, RatesFacade],
  animations: [fadeIn],
})
export class RateListComponent implements OnInit {
  rates$ = this.ratesFacade.rates$;
  expenses$: Observable<Expense[]>;

  selectedExpenses: Expense[] = [];
  selectedRates: Rate[] = [];

  tableDefaults = TABLE_DEFAULTS;

  tableOptions = {
    columns: [
      { name: 'Amount', value: 'amount' },
      { name: 'Description', value: 'description' },
      { name: 'Creation Date', value: 'creationDate' },
      { name: 'Payed On', value: 'payedOn' },
      { name: 'Expense', value: 'expense' },
    ],
  };

  selectedDescription = '';

  lastEvent: LazyLoadEvent;
  total$ = this.ratesFacade.total$;

  constructor(
    private confirmationService: ConfirmationService,
    private ratesFacade: RatesFacade,
    private expensesFacade: ExpenseService
  ) {}

  ngOnInit() {
    this.getData(null);
  }

  clearExpenseFilter(): void {
    this.selectedExpenses = [];
    this.ratesFacade.getRates(this.lastEvent);
  }

  filterTable($event) {
    // TODO investigate table 'filters' property to inject the dropdown value
    // TODO hit expenses endpoint => this should also be paged
    const expenses = $event.value;
    /*if (expenses.length) {
      const ids = expenses.map(ex => ex.id);
      this.ratesFacade.getRatesByExpenseIds(ids, this.lastEvent).subscribe(rates => this.pageData$.rates = rates);
    } else {
      this.ratesFacade.getRates(TABLE_DEFAULTS.query);
    }*/
  }

  confirmDeletion() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete these rates?',
      accept: () => {
        // TODO check map warning
        const ids = this.selectedRates.map((el) => el.id);
        this.ratesFacade.deleteRates(ids);
      },
    });
  }

  onDelete(rate: Rate): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${rate.amount} ?`,
      accept: () => {
        this.ratesFacade.deleteRates([rate.id]);
      },
    });
  }

  getData($event: any) {
    this.ratesFacade.getRates($event);
  }
}

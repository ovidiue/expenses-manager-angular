import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { Expense } from '@models/interfaces';

import { fadeIn } from '@utils/animations/fadeIn';

import { ExpenseFacade } from '../expense.facade';

import { TranslocoService } from '@ngneat/transloco';
import { OverlayService } from '@shared/modal/overlay.service';

export class ExpenseDataSource extends DataSource<Expense> {
  /** Stream of data that is provided to the table. */
  data = this.expenseFacade.expenses$;

  constructor(private readonly expenseFacade: ExpenseFacade) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Expense[]> {
    return this.data;
  }

  disconnect() {}
}

@Component({
  selector: 'app-expenses',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss'],
  animations: [fadeIn],
})
export class ExpenseListComponent implements OnInit {
  tableColumns: string[] = [
    'name',
    'amount',
    'description',
    'recurrent',
    'createdOn',
    'dueDate',
    'category',
    'tags',
    'payed',
    'actions',
  ];
  dataSource = new ExpenseDataSource(this.expenseFacade);

  loading$ = this.expenseFacade.loading$;

  constructor(
    private router: Router,
    private expenseFacade: ExpenseFacade,
    private overlayService: OverlayService,
    private readonly _translocoService: TranslocoService
  ) {}

  ngOnInit() {
    this.expenseFacade.getExpenses(null);
  }

  showDeleteDialog(expense: Expense) {
    const text = this._translocoService.translate('EXPENSES.LIST.DELETE', {
      expenseName: expense.name,
    });
    const overlayRef = this.overlayService.open(text, null);
    overlayRef.afterClosed$.subscribe((res) => {
      if (res.data) {
        this.expenseFacade.deleteExpensesApi([expense.id], false);
        this.expenseFacade.getExpenses(null);
      }
    });
  }
}

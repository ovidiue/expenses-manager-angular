import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutePaths } from '@models/enums/route-paths.enum';
import { Expense } from '@models/interfaces';
import { fadeIn } from '@utils/animations/fadeIn';
import { MessageService } from 'primeng/api';
import { map, pluck, switchMap, takeUntil } from 'rxjs/operators';

import { ExpenseDetailBase } from './expense-detail-base';
import { ExpenseFacade } from '../expense.facade';

@Component({
  selector: 'app-expense-detail',
  templateUrl: './expense-detail.component.html',
  styleUrls: ['./expense-detail.component.scss'],
  providers: [MessageService],
  animations: [fadeIn],
})
export class ExpenseDetailEditComponent
  extends ExpenseDetailBase
  implements OnInit {
  pageTitle: string;

  constructor(
    protected location: Location,
    protected router: Router,
    protected expenseFacade: ExpenseFacade,
    protected route: ActivatedRoute
  ) {
    super(location, router, expenseFacade, route);

    this.pageTitle = 'Edit expense';
  }

  ngOnInit() {
    this.expenseForm.addControl('id', new FormControl(null));

    this.route.params
      .pipe(
        takeUntil(this._destroy$),
        pluck('id'),
        switchMap((id: number) => this.expenseFacade.getExpense(id)),
        map((exp: Expense) => ({
          name: exp.name,
          amount: exp.amount,
          description: exp.description,
          dueDate: exp.dueDate,
          category: exp.category || {},
          tags: exp.tags || [],
          recurrent: exp.recurrent,
          id: exp.id,
        }))
      )
      .subscribe((expense: Expense) => this.expenseForm.setValue(expense));
  }

  onSubmit() {
    this.isFormSubmitted = true;

    if (!this.expenseForm.valid) {
      return;
    }

    this.expenseFacade
      .updateExpense(this.expenseForm.value)
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => {
        this.router.navigate([RoutePaths.EXPENSE_LISTING]);
      });
  }
}
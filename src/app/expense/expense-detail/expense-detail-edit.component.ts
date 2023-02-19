import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { RoutePaths } from '@models/enums/route-paths.enum';
import { Expense } from '@models/interfaces';

import { TranslocoService } from '@ngneat/transloco';

import { fadeIn } from '@utils/animations';

import { map, switchMap, takeUntil } from 'rxjs/operators';

import { CategoryFacade } from '../../category';
import { TagFacade } from '../../tag';
import { ExpenseFacade } from '../expense.facade';
import { ExpenseDetailBaseComponent } from './expense-detail-base.component';

@Component({
  selector: 'app-expense-detail',
  templateUrl: './expense-detail.component.html',
  styleUrls: ['./expense-detail.component.scss'],
  animations: [fadeIn],
})
export class ExpenseDetailEditComponent
  extends ExpenseDetailBaseComponent
  implements OnInit
{
  pageTitle = this._translocoService.translate('EXPENSES.DETAIL.EDIT');

  constructor(
    protected location: Location,
    protected router: Router,
    protected expenseFacade: ExpenseFacade,
    protected route: ActivatedRoute,
    protected tagFacade: TagFacade,
    protected categoryFacade: CategoryFacade,
    private readonly _translocoService: TranslocoService
  ) {
    super(location, router, expenseFacade, route, tagFacade, categoryFacade);
  }

  ngOnInit() {
    this.expenseForm.addControl('id', new UntypedFormControl(null));

    this.route.params
      .pipe(
        takeUntil(this._destroy$),
        switchMap(({ id }) => this.expenseFacade.getExpense(id)),
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

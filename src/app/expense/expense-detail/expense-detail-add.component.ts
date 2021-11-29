import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { RoutePaths } from '@models/enums/route-paths.enum';

import { fadeIn } from '@utils/animations';

import { CategoryFacade } from '../../category';
import { TagFacade } from '../../tag';
import { ExpenseFacade } from '../expense.facade';
import { ExpenseDetailBaseComponent } from './expense-detail-base.component';

import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-expense-detail',
  templateUrl: './expense-detail.component.html',
  styleUrls: ['./expense-detail.component.scss'],
  animations: [fadeIn],
})
export class ExpenseDetailAddComponent extends ExpenseDetailBaseComponent {
  pageTitle = this._translocoService.translate('EXPENSES.DETAIL.ADD');

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

  onSubmit() {
    this.isFormSubmitted = true;

    if (!this.expenseForm.valid) {
      return;
    }

    this.expenseFacade.saveExpense(this.expenseForm.value).subscribe(() => {
      this.router.navigate([RoutePaths.EXPENSE_LISTING]);
    });
  }
}

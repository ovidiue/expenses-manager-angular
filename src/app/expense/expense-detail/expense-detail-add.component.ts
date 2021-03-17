import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from 'primeng/api';

import { RoutePaths } from '@models/enums/route-paths.enum';

import { fadeIn } from '@utils/animations/fadeIn';

import { CategoryFacade } from '../../category/category.facade';
import { TagFacade } from '../../tag/tag.facade';
import { ExpenseFacade } from '../expense.facade';
import { ExpenseDetailBase } from './expense-detail-base';

@Component({
  selector: 'app-expense-detail',
  templateUrl: './expense-detail.component.html',
  styleUrls: ['./expense-detail.component.scss'],
  providers: [MessageService],
  animations: [fadeIn],
})
export class ExpenseDetailAddComponent extends ExpenseDetailBase {
  constructor(
    protected location: Location,
    protected router: Router,
    protected expenseFacade: ExpenseFacade,
    protected route: ActivatedRoute,
    protected tagFacade: TagFacade,
    protected categoryFacade: CategoryFacade
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

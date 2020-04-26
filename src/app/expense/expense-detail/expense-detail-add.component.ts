import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutePaths } from '@models/enums/route-paths.enum';
import { fadeIn } from '@utils/animations/fadeIn';
import { MessageService } from 'primeng/api';

import { ExpenseDetailBase } from './expense-detail-base';
import { ExpenseDetailService } from './expense-detail.service';

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
    protected service: ExpenseDetailService,
    protected route: ActivatedRoute
  ) {
    super(location, router, service, route);
  }

  onSubmit() {
    this.isFormSubmitted = true;

    if (!this.expenseForm.valid) {
      return;
    }

    this.service.saveExpense(this.expenseForm.value).subscribe(() => {
      this.router.navigate([RoutePaths.EXPENSE_LISTING]);
    });
  }
}

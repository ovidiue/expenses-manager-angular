import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ExpenseDetailService } from './expense-detail.service';
import { fadeIn } from '@utils/animations/fadeIn';
import { MESSAGES } from '@utils/messages';
import { GlobalNotificationService } from '@services/global-notification.service';
import { ExpenseDetailBase } from './expense-detail-base';
import { RoutePaths } from '@models/enums/route-paths';

@Component({
  selector: 'app-expense-detail',
  templateUrl: './expense-detail.component.html',
  styleUrls: ['./expense-detail.component.scss'],
  providers: [MessageService],
  animations: [fadeIn]
})
export class ExpenseDetailAddComponent extends ExpenseDetailBase {
  constructor(
    protected location: Location,
    protected router: Router,
    protected globalNotificationService: GlobalNotificationService,
    protected service: ExpenseDetailService,
    protected route: ActivatedRoute
  ) {
    super(location, router, globalNotificationService, service, route);
  }

  onSubmit() {
    this.isFormSubmitted = true;

    if (!this.expenseForm.valid) {
      return;
    }

    this.service
      .saveExpense(this.expenseForm.value)
      .subscribe(() => {
          this.router.navigate([RoutePaths.EXPENSE_LISTING]);
          this.globalNotificationService.add(MESSAGES.EXPENSE.ADD);
        },
        err => this.globalNotificationService.add(MESSAGES.ERROR)
      );
  }


}

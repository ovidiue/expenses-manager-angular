import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutePaths } from '@models/enums/route-paths';
import { Expense } from '@models/expense';
import { GlobalNotificationService } from '@services/global-notification.service';
import { fadeIn } from '@utils/animations/fadeIn';
import { MESSAGES } from '@utils/messages';
import { MessageService } from 'primeng/api';
import { map, pluck, switchMap } from 'rxjs/operators';

import { ExpenseDetailBase } from './expense-detail-base';
import { ExpenseDetailService } from './expense-detail.service';

@Component({
  selector: 'app-expense-detail',
  templateUrl: './expense-detail.component.html',
  styleUrls: ['./expense-detail.component.scss'],
  providers: [MessageService],
  animations: [fadeIn]
})
export class ExpenseDetailEditComponent extends ExpenseDetailBase implements OnInit {
  pageTitle: string;

  constructor(
    protected location: Location,
    protected router: Router,
    protected globalNotificationService: GlobalNotificationService,
    protected service: ExpenseDetailService,
    protected route: ActivatedRoute
  ) {
    super(location, router, globalNotificationService, service, route);

    this.pageTitle = 'Edit expense';
  }

  ngOnInit() {
    this.expenseForm.addControl('id', new FormControl(null));

    this.subscriptions.push(
      this.route.params
        .pipe(
          pluck('id'),
          switchMap((id: number) => this.service.getExpense(id)),
          map((exp: Expense) => ({
            title: exp.title,
            amount: exp.amount,
            description: exp.description,
            dueDate: exp.dueDate,
            category: exp.category,
            tags: exp.tags,
            recurrent: exp.recurrent,
            id: exp.id
          })),
        )
        .subscribe((expense: Expense) => this.expenseForm.setValue(expense))
    );
  }

  onSubmit() {
    this.isFormSubmitted = true;

    if (!this.expenseForm.valid) {
      return;
    }

    this.service
      .updateExpense(this.expenseForm.value)
      .subscribe(() => {
          this.router.navigate([RoutePaths.EXPENSE_LISTING]);
          this.globalNotificationService.add(MESSAGES.EXPENSE.ADD);
        },
        err => this.globalNotificationService.add(MESSAGES.ERROR)
      );
  }

}

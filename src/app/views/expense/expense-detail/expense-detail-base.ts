import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { SelectItem } from 'primeng/api';
import { ExpenseDetailService } from './expense-detail.service';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { GlobalNotificationService } from '@services/global-notification.service';
import { SubscriptionsBaseClass } from '@models/subscriptions-base.class';

export class ExpenseDetailBase extends SubscriptionsBaseClass {
  pageTitle: string;
  isFormSubmitted = false;
  expenseForm: FormGroup;
  minDate = moment().startOf('day').toDate();
  tags$: Observable<SelectItem[]>;
  categories$: Observable<SelectItem[]>;

  constructor(
    protected location: Location,
    protected router: Router,
    protected globalNotificationService: GlobalNotificationService,
    protected service: ExpenseDetailService,
    protected route: ActivatedRoute
  ) {
    super();

    this.expenseForm = new FormGroup({
      title: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
      description: new FormControl(''),
      recurrent: new FormControl(false),
      dueDate: new FormControl(''),
      category: new FormControl(null),
      tags: new FormControl([]),
    });

    this.tags$ = this.service.getTags();
    this.categories$ = this.service.getCategories();

  }

  get title(): AbstractControl {
    return this.expenseForm.get('title');
  }

  get amount(): AbstractControl {
    return this.expenseForm.get('amount');
  }

  goBack(event: any) {
    event.preventDefault();
    this.location.back();
  }


}

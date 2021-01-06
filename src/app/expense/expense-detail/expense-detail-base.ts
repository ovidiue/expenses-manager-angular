import { Location } from '@angular/common';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { SelectItem } from 'primeng/api';
import { Observable, Subject } from 'rxjs';

import { ExpenseDetailService } from './expense-detail.service';
import { OnDestroy } from '@angular/core';

export class ExpenseDetailBase implements OnDestroy {
  pageTitle: string;
  isFormSubmitted = false;
  expenseForm: FormGroup;
  minDate = moment().startOf('day').toDate();
  tags$: Observable<SelectItem[]>;
  categories$: Observable<SelectItem[]>;
  protected _destroy$ = new Subject();

  constructor(
    protected location: Location,
    protected router: Router,
    protected service: ExpenseDetailService,
    protected route: ActivatedRoute
  ) {
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

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  goBack(event: any) {
    event.preventDefault();
    this.location.back();
  }
}

import { Location } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subject } from 'rxjs';

import { Category, Tag } from '@models/interfaces';

import { CategoryFacade } from '../../category';
import { TagFacade } from '../../tag';
import { ExpenseFacade } from '../expense.facade';

@Component({
  selector: 'app-expense-detail-base',
  template: '',
})
export class ExpenseDetailBaseComponent implements OnDestroy {
  pageTitle: string;
  isFormSubmitted = false;
  expenseForm: UntypedFormGroup;
  minDate = new Date();
  tags$: Observable<Tag[]> = this.tagFacade.tags$;
  categories$: Observable<Category[]> = this.categoryFacade.categories$;

  protected _destroy$ = new Subject();

  constructor(
    protected location: Location,
    protected router: Router,
    protected expenseFacade: ExpenseFacade,
    protected route: ActivatedRoute,
    protected tagFacade: TagFacade,
    protected categoryFacade: CategoryFacade
  ) {
    this.expenseForm = new UntypedFormGroup({
      name: new UntypedFormControl('', Validators.required),
      amount: new UntypedFormControl('', Validators.required),
      description: new UntypedFormControl(''),
      recurrent: new UntypedFormControl(false),
      dueDate: new UntypedFormControl('', Validators.required),
      category: new UntypedFormControl(null),
      tags: new UntypedFormControl([]),
    });
  }

  get name(): UntypedFormControl {
    return this.expenseForm.get('name') as UntypedFormControl;
  }

  get amount(): UntypedFormControl {
    return this.expenseForm.get('amount') as UntypedFormControl;
  }

  get dueDate() {
    return this.expenseForm.get('dueDate') as UntypedFormControl;
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  goBack(event: any) {
    event.preventDefault();
    this.location.back();
  }

  isErrorVisible(ctrl: UntypedFormControl) {
    return ctrl.invalid && (ctrl.touched || this.isFormSubmitted);
  }
}

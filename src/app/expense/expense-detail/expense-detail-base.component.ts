import { Location } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  expenseForm: FormGroup;
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
    this.expenseForm = new FormGroup({
      name: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
      description: new FormControl(''),
      recurrent: new FormControl(false),
      dueDate: new FormControl('', Validators.required),
      category: new FormControl(null),
      tags: new FormControl([]),
    });
  }

  get name(): FormControl {
    return this.expenseForm.get('name') as FormControl;
  }

  get amount(): FormControl {
    return this.expenseForm.get('amount') as FormControl;
  }

  get dueDate() {
    return this.expenseForm.get('dueDate') as FormControl;
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  goBack(event: any) {
    event.preventDefault();
    this.location.back();
  }

  isErrorVisible(ctrl: FormControl) {
    return ctrl.invalid && (ctrl.touched || this.isFormSubmitted);
  }
}

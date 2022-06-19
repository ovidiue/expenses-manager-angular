import { Location } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Expense } from '@models/interfaces';

import { ExpenseFacade } from '../../expense/expense.facade';
import { RatesFacade } from '../rates.facade';

@Component({
  selector: 'app-rate-detail-base',
  template: '',
})
export class RateDetailBaseComponent implements OnDestroy {
  // TODO: on edit, expense doesn't preselect previous value

  get amount(): AbstractControl {
    return this.rateFormControls.get('amount');
  }

  get payedOn(): AbstractControl {
    return this.rateFormControls.get('payedOn');
  }
  private _destroy$ = new Subject();
  expenses$: Observable<Expense[]> = this.expenseFacade.expenses$;
  isSubmitted = false;
  pageTitle: string;
  nameExists = false;
  maxDate = new Date();
  expenses: any[];
  rateFormControls: UntypedFormGroup;

  constructor(
    protected location: Location,
    protected router: Router,
    protected ratesFacade: RatesFacade,
    protected expenseFacade: ExpenseFacade,
    protected route: ActivatedRoute
  ) {
    this.rateFormControls = new UntypedFormGroup({
      amount: new UntypedFormControl(null, Validators.required),
      payedOn: new UntypedFormControl(
        { value: null, disabled: true },
        Validators.required
      ),
      expense: new UntypedFormControl(''),
      description: new UntypedFormControl(''),
    });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  checkName($event): void {
    const name = $event.target.value;
    this.ratesFacade
      .getRateByName(name)
      .pipe(takeUntil(this._destroy$))
      .subscribe((resp) => {
        this.nameExists = !!resp;
      });
  }

  goBack(event: any) {
    event.preventDefault();
    this.location.back();
  }

  compareExpenses(exp1: Expense, exp2: Expense): boolean {
    return exp1 && exp2 ? exp1.id === exp2.id : exp1 === exp2;
  }
}

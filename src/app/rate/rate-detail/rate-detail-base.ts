import { Location } from '@angular/common';
import { OnDestroy } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { Expense } from '@models/interfaces';

import { ExpenseFacade } from '../../expense/expense.facade';
import { RatesFacade } from '../rates.facade';

export class RateDetailBase implements OnDestroy {
  expenses$: Observable<Expense[]> = this.expenseFacade.expenses$.pipe(
    tap(console.log)
  );
  isSubmitted = false;
  pageTitle: string;
  nameExists = false;
  maxDate = new Date();
  expenses: any[];
  rateFormControls: FormGroup;
  private _destroy$ = new Subject();

  constructor(
    protected location: Location,
    protected router: Router,
    protected ratesFacade: RatesFacade,
    protected expenseFacade: ExpenseFacade,
    protected route: ActivatedRoute
  ) {
    this.rateFormControls = new FormGroup({
      amount: new FormControl(null, Validators.required),
      payedOn: new FormControl(null, Validators.required),
      expense: new FormControl(''),
      description: new FormControl(''),
    });
  }

  // TODO: on edit, expense doesn't preselect previous value

  get amount(): AbstractControl {
    return this.rateFormControls.get('amount');
  }

  get payedOn(): AbstractControl {
    return this.rateFormControls.get('payedOn');
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

import { Location } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, Validators, } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OnDestroy } from '@angular/core';
import { RatesFacade } from '../rates.facade';

export class RateDetailBase implements OnDestroy {
  expenses$: Observable<any[]>;
  isSubmitted = false;
  pageTitle: string;
  nameExists = false;
  maxDate = moment().toDate();
  expenses: any[];
  rateFormControls: FormGroup;
  private _destroy$ = new Subject();

  constructor(
    protected location: Location,
    protected router: Router,
    protected ratesFacade: RatesFacade,
    protected route: ActivatedRoute
  ) {
    this.rateFormControls = new FormGroup({
      amount: new FormControl(null, Validators.required),
      payedOn: new FormControl(null, Validators.required),
      /*expense: new FormControl(null),*/
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
}

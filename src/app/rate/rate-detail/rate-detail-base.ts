import { Location } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, Validators, } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TABLE_DEFAULTS } from '@utils/table-options';
import * as moment from 'moment';
import { Observable, Subject } from 'rxjs';

import { RateDetailService } from './rate-detail.service';
import { takeUntil } from 'rxjs/operators';
import { OnDestroy } from '@angular/core';

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
    protected service: RateDetailService,
    protected route: ActivatedRoute
  ) {
    this.expenses$ = this.service.getExpenses(TABLE_DEFAULTS.maxSize);
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
    this.service
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

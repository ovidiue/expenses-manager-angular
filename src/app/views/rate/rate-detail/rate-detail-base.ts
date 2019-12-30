import { SubscriptionsBaseClass } from '@models/subscriptions-base.class';
import { ActivatedRoute, Router } from '@angular/router';
import { RateDetailService } from './rate-detail.service';
import { Observable } from 'rxjs';
import { TABLE_DEFAULTS } from '@utils/table-options';
import * as moment from 'moment';
import { Location } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

export class RateDetailBase extends SubscriptionsBaseClass {

  expenses$: Observable<any[]>;

  isSubmitted = false;
  pageTitle: string;
  nameExists = false;
  maxDate = moment().toDate();
  expenses: any[];
  rateFormControls: FormGroup;

  // TODO: on edit, expense doesn't preselect previous value

  constructor(
      protected location: Location,
      protected router: Router,
      protected service: RateDetailService,
      protected route: ActivatedRoute
  ) {
    super();

    this.expenses$ = this.service.getExpenses(TABLE_DEFAULTS.maxSize);
    this.rateFormControls = new FormGroup({
          amount: new FormControl(null, Validators.required),
          payedOn: new FormControl(null, Validators.required),
          expense: new FormControl(null),
          observation: new FormControl('')
        }
    );
  }

  get amount(): AbstractControl {
    return this.rateFormControls.get('amount');
  }

  get payedOn(): AbstractControl {
    return this.rateFormControls.get('payedOn');
  }

  checkName($event): void {
    const name = $event.target.value;
    this.service.getRateByName(name)
        .subscribe(resp => {
          this.nameExists = !!resp;
        });
  }

  goBack(event: any) {
    event.preventDefault();
    this.location.back();
  }

}

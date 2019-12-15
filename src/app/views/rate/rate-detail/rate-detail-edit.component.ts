import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { RateDetailService } from './rate-detail.service';
import { fadeIn } from '@utils/animations/fadeIn';
import { MESSAGES } from '@utils/messages';
import { RoutePaths } from '@models/enums/route-paths';
import { GlobalNotificationService } from '@services/global-notification.service';
import { RateDetailBase } from './rate-detail-base';
import { FormControl } from '@angular/forms';
import { map, pluck, switchMap } from 'rxjs/operators';
import { Rate } from '@models/rate';
import * as moment from 'moment';

@Component({
  selector: 'app-rate-detail',
  templateUrl: './rate-detail.component.html',
  styleUrls: ['./rate-detail.component.scss'],
  animations: [fadeIn]
})
export class RateDetailEditComponent extends RateDetailBase implements OnInit {
  initialExpenseId: string;

  constructor(
      protected location: Location,
      protected router: Router,
      protected service: RateDetailService,
      protected globalNotificationService: GlobalNotificationService,
      protected route: ActivatedRoute
  ) {
    super(location, router, service, globalNotificationService, route);

    this.pageTitle = 'Edit rate';
  }


  // TODO: on edit, expense doesn't preselect previous value

  ngOnInit(): void {
    this.rateFormControls.addControl('id', new FormControl(null));

    this.route.params
        .pipe(
            pluck('id'),
            switchMap((id: number) => this.service.getRate(id)),
            map((rate: Rate) => ({
              id: rate.id,
              amount: rate.amount,
              payedOn: moment(rate.payedOn).toDate(),
              observation: rate.observation,
              expense: rate.expense
            }))
        )
        .subscribe((rate: any) => {
          this.rateFormControls.setValue(rate);
          if (rate.expense) {
            this.initialExpenseId = rate.expense.id;
          }
        });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.rateFormControls.invalid) {
      return;
    }

    this.service
        .updateRate(this.rateFormControls.value, this.initialExpenseId, null)
        .subscribe(
            () => {
              this.router.navigate([RoutePaths.RATES_LISTING]);
              this.globalNotificationService.add(MESSAGES.RATE.ADD);
            },
            () => this.globalNotificationService.add(MESSAGES.ERROR));
  }
}

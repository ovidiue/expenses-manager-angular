import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { RateDetailService } from './rate-detail.service';
import { fadeIn } from '@utils/animations/fadeIn';
import { MESSAGES } from '@utils/messages';
import { RoutePaths } from '@models/enums/route-paths';
import { GlobalNotificationService } from '@services/global-notification.service';
import { RateDetailBase } from './rate-detail-base';

@Component({
  selector: 'app-rate-detail',
  templateUrl: './rate-detail.component.html',
  styleUrls: ['./rate-detail.component.scss'],
  animations: [fadeIn]
})
export class RateDetailAddComponent extends RateDetailBase {


  // TODO: on edit, expense doesn't preselect previous value

  constructor(
      protected location: Location,
      protected router: Router,
      protected service: RateDetailService,
      protected globalNotificationService: GlobalNotificationService,
      protected route: ActivatedRoute
  ) {
    super(location, router, service, globalNotificationService, route);

    this.pageTitle = 'Add rate';
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.rateFormControls.invalid) {
      return;
    }

    this.service
        .saveRate(this.rateFormControls.value)
        .subscribe(
            () => {
              this.router.navigate([RoutePaths.RATES_LISTING]);
              this.globalNotificationService.add(MESSAGES.RATE.ADD);
            },
            () => this.globalNotificationService.add(MESSAGES.ERROR));
  }
}

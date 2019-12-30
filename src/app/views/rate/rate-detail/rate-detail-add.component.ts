import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { RateDetailService } from './rate-detail.service';
import { fadeIn } from '@utils/animations/fadeIn';
import { RoutePaths } from '@models/enums/route-paths';
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
    protected route: ActivatedRoute
  ) {
    super(location, router, service, route);

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
        });
  }
}

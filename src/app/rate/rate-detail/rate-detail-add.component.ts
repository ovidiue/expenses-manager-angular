import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { RoutePaths } from '@models/enums/route-paths.enum';

import { fadeIn } from '@utils/animations/fadeIn';

import { ExpenseFacade } from '../../expense/expense.facade';
import { RatesFacade } from '../rates.facade';
import { RateDetailBase } from './rate-detail-base';

@Component({
  selector: 'app-rate-detail',
  templateUrl: './rate-detail.component.html',
  styleUrls: ['./rate-detail.component.scss'],
  animations: [fadeIn],
})
export class RateDetailAddComponent extends RateDetailBase {
  // TODO: on edit, expense doesn't preselect previous value

  constructor(
    protected location: Location,
    protected router: Router,
    protected ratesFacade: RatesFacade,
    protected expenseFacade: ExpenseFacade,
    protected route: ActivatedRoute
  ) {
    super(location, router, ratesFacade, expenseFacade, route);

    this.pageTitle = 'Add rate';
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.rateFormControls.invalid) {
      return;
    }

    this.ratesFacade.saveRate(this.rateFormControls.value).subscribe(() => {
      this.router.navigate([RoutePaths.RATES_LISTING]);
    });
  }
}

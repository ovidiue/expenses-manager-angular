import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { map, switchMap } from 'rxjs/operators';

import { RoutePaths } from '@models/enums/route-paths.enum';
import { Rate } from '@models/interfaces';

import { fadeIn } from '@utils/animations/fadeIn';

import { ExpenseFacade } from '../../expense/expense.facade';
import { RatesFacade } from '../rates.facade';
import { RateDetailBaseComponent } from './rate-detail-base.component';

import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-rate-detail',
  templateUrl: './rate-detail.component.html',
  styleUrls: ['./rate-detail.component.scss'],
  animations: [fadeIn],
})
export class RateDetailEditComponent
  extends RateDetailBaseComponent
  implements OnInit
{
  initialExpenseId: string;

  constructor(
    protected location: Location,
    protected router: Router,
    protected ratesFacade: RatesFacade,
    protected route: ActivatedRoute,
    protected expenseFacade: ExpenseFacade,
    private readonly _translocoService: TranslocoService
  ) {
    super(location, router, ratesFacade, expenseFacade, route);

    this.pageTitle = this._translocoService.translate('RATE.DETAIL.EDIT');
  }

  ngOnInit(): void {
    this.rateFormControls.addControl('id', new FormControl(null));

    this.route.params
      .pipe(
        map((params) => params.id),
        switchMap((id: number) => this.ratesFacade.getRate(id)),
        map((rate: Rate) => ({
          id: rate.id,
          amount: rate.amount,
          payedOn: rate.payedOn,
          description: rate.description,
          expense: rate.expense || {},
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

    this.ratesFacade
      .updateRate(this.rateFormControls.value, this.initialExpenseId, null)
      .subscribe(() => {
        this.router.navigate([RoutePaths.RATES_LISTING]);
      });
  }
}

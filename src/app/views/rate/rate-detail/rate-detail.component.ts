import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import * as moment from 'moment';
import { RateDetailService } from './rate-detail.service';
import { Observable, of, Subscription } from 'rxjs';
import { pluck, switchMap, tap } from 'rxjs/operators';
import { fadeIn } from '@utils/animations/fadeIn';
import { Rate } from '@models/rate';
import { MESSAGES } from '@utils/messages';
import { RoutePaths } from '@models/enums/route-paths';
import { TABLE_DEFAULTS } from '@utils/table-options';
import { GlobalNotificationService } from '@services/global-notification.service';

@Component({
  selector: 'app-rate-detail',
  templateUrl: './rate-detail.component.html',
  styleUrls: ['./rate-detail.component.scss'],
  animations: [fadeIn]
})
export class RateDetailComponent implements OnInit, OnDestroy {

  routeSubscription: Subscription;
  expenses$: Observable<any[]>;

  pageTitle: string;
  rate = new Rate();
  id: number;
  nameExists = false;
  maxDate = moment().toDate();
  expenses: any[];
  initialExpenseId: string = null;
  initialRateAmount: string = null;

  // TODO: on edit, expense doesn't preselect previous value

  constructor(private location: Location,
              private router: Router,
              private service: RateDetailService,
              private globalNotificationService: GlobalNotificationService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.routeSubscription = this.route.params
    .pipe(
        pluck('id'),
        tap((id: number) => {
          if (id) {
            this.id = id;
            this.pageTitle = 'Edit Rate';
          } else {
            this.pageTitle = 'Add Rate';
          }
        }),
        switchMap(id => id ? this.service.getRate(id) : of({}))
    ).subscribe(rate => {
      this.rate = rate;
      this.rate.payedOn = moment(this.rate.payedOn).toDate();
      if (rate.expense && rate.expense.id) {
        this.initialExpenseId = rate.expense.id;
      }
      this.initialRateAmount = rate.amount;
    });

    this.expenses$ = this.service.getExpenses(TABLE_DEFAULTS.maxSize);
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

  checkName($event): void {
    const name = $event.target.value;
    this.service.getRateByName(name)
    .subscribe(resp => {
      if (resp) {
        this.nameExists = true;
      } else {
        this.nameExists = false;
      }
    });
  }

  goBack(event: any) {
    event.preventDefault();
    this.location.back();
  }

  onSubmit() {
    this.id === null
        ?
        this.service.saveRate(this.rate)
        .subscribe(() => {
          this.router.navigate([RoutePaths.RATES_LISTING]);
          this.globalNotificationService.add(MESSAGES.RATE.ADD);
        }, () => this.globalNotificationService.add(MESSAGES.ERROR))
        :
        this.service.updateRate(this.rate, this.initialExpenseId, this.initialRateAmount)
        .subscribe(() => {
          this.router.navigate([RoutePaths.RATES_LISTING]);
          this.globalNotificationService.add(MESSAGES.RATE.UPDATE + this.rate.amount + '!');
        }, () => this.globalNotificationService.add(MESSAGES.ERROR));
  }
}

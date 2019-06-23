import {Component, OnInit} from '@angular/core';
import {Rate} from '../../models/rate';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import * as moment from 'moment';
import {GlobalNotificationService} from '../../services/global-notification.service';
import {MESSAGES} from '../../utils/messages';
import {fadeIn} from '../../utils/animations/fadeIn';
import {TABLE_DEFAULTS} from '../../utils/table-options';
import {RateDetailService} from './rate-detail.service';

@Component({
  selector: 'app-rate-detail',
  templateUrl: './rate-detail.component.html',
  styleUrls: ['./rate-detail.component.scss'],
  animations: [fadeIn]
})
export class RateDetailComponent implements OnInit {
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
    this.getExpenses();
    this.id = <any>this.route.snapshot.paramMap.get('id');
    this.pageTitle = this.determineTitle();
    this.getRate();
  }

  determineTitle(): string {
    if (this.id) {
      return 'Edit Rate';
    } else {
      return 'Add Rate';
    }
  }

  getRate(): void {
    if (this.id) {
      this.service.getRate(this.id).then(rate => {
        this.rate = rate;
        this.rate.payedOn = moment(this.rate.payedOn).toDate();
        if (rate.expense && rate.expense.id) {
          this.initialExpenseId = rate.expense.id;
        }
        this.initialRateAmount = rate.amount;
      }).catch(err => this.globalNotificationService.add(MESSAGES.error + ' err: ' + err));
    }
  }

  checkName($event): void {
    const name = $event.target.value;
    this.service.getRateByName(name)
    .then(resp => {
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
      .then(() => {
        this.router.navigate(['/rates']);
        this.globalNotificationService.add(MESSAGES.addRate);
      })
      .catch(err => this.globalNotificationService.add(MESSAGES.error))
      :
      this.service.updateRate(this.rate, this.initialExpenseId, this.initialRateAmount)
      .then(() => {
        this.router.navigate(['/rates']);
        this.globalNotificationService.add(MESSAGES.updatedRate + this.rate.amount + '!');
      }).catch(() => this.globalNotificationService.add(MESSAGES.error));
  }

  private getExpenses() {
    this.service.getExpenses(TABLE_DEFAULTS.maxSize).then(resp => {
      this.expenses = resp.content.map(exp => {
        return {
          label: exp.title,
          value: exp
        };
      });
    });
  }
}

import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Rate} from '../classes/rate';
import {RateService} from '../rate.service';
import {GlobalNotificationService} from '../global-notification.service';
import {MESSAGES} from '../utils/messages';

@Component({
  selector: 'app-rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class RatesComponent implements OnInit {
  rates: Rate[];
  selectedRates: Rate[] = [];

  constructor(private confirmationService: ConfirmationService,
              private rateService: RateService,
              private globalNotificationService: GlobalNotificationService) {
  }

  ngOnInit() {
    this.getRates();
  }

  getRates(): void {
    this.rateService.getRates().then(rates => this.rates = rates);
  }

  confirmDeletion() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete these rates?',
      accept: () => {
        const ids = this.selectedRates.map(el => el.id);
        this.rateService.deleteRates(ids)
        .then(() => {
          this.rates = this.rates.filter(rate => ids.indexOf(rate.id) < 0);
          this.globalNotificationService.add(MESSAGES.deletedRates);
        })
        .catch(err => this.globalNotificationService.add(MESSAGES.error));
      }
    });
  }

  onDelete(rate: Rate): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${rate.amount} ?`,
      accept: () => {
        this.rateService.deleteRates([rate.id])
        .then(() => {
          this.rates = this.rates.filter(el => el.id !== rate.id);
          this.globalNotificationService.add(MESSAGES.deletedRate);
        })
        .catch(() => this.globalNotificationService.add(MESSAGES.error));
      }
    });
  }

}

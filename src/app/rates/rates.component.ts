import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Rate} from '../classes/rate';
import {RateService} from '../rate.service';

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
              private messageService: MessageService) {
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
        console.log('ids to delete', ids);
        this.rateService.deleteRates(ids)
        .then(() => {
          this.rates = this.rates.filter(rate => ids.indexOf(rate.id) < 0);
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Succesfully deleted rates...'});
        })
        .catch(err => alert('something went wrong' + err));
      }
    });
  }

  onEdit(rate: Rate): void {
    console.log('edit', rate);
  }

  onDelete(rate: Rate): void {
    console.log('delete', rate);
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${rate.amount} ?`,
      accept: () => {
        this.rateService.deleteRates([rate.id])
        .then(() => {
          this.rates = this.rates.filter(el => el.id !== rate.id);
        });
      }
    });
  }

}

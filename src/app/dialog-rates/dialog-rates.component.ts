import {Component, OnInit} from '@angular/core';
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from 'primeng/api';
import {Rate} from '../classes/rate';

@Component({
  selector: 'app-dialog-rates',
  templateUrl: './dialog-rates.component.html',
  styleUrls: ['./dialog-rates.component.scss'],
  providers: [DialogService]
})
export class DialogRatesComponent implements OnInit {
  rates: Rate[];

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
  }

  ngOnInit() {
    this.rates = this.config.data.rates;
  }

}

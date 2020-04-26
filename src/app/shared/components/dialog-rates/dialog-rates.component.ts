import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Rate } from '@models/rate.interface';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng';

@Component({
  selector: 'app-dialog-rates',
  templateUrl: './dialog-rates.component.html',
  styleUrls: ['./dialog-rates.component.scss'],
  providers: [DialogService],
})
export class DialogRatesComponent implements OnInit {
  rates: Rate[];

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private router: Router
  ) {}

  ngOnInit() {
    this.rates = this.config.data.resp.content;
  }

  goToAddRate(): void {
    this.ref.close();
    this.router.navigate(['/rates/add']);
  }
}

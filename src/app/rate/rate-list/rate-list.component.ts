import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Rate } from '@models/interfaces';

import { fadeIn } from '@utils/animations/fadeIn';

import { RatesFacade } from '../rates.facade';

import { TranslocoService } from '@ngneat/transloco';
import { OverlayService } from '@shared/modal/overlay.service';

export class RateDataSource extends DataSource<Rate> {
  /** Stream of data that is provided to the table. */
  data = this.ratesFacade.rates$;

  constructor(private readonly ratesFacade: RatesFacade) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Rate[]> {
    return this.data;
  }

  disconnect() {}
}

@Component({
  selector: 'app-rates',
  templateUrl: './rate-list.component.html',
  styleUrls: ['./rate-list.component.scss'],
  animations: [fadeIn],
})
export class RateListComponent implements OnInit {
  tableColumns: string[] = [
    'amount',
    'description',
    'creationDate',
    'payedOn',
    'expense',
    'actions',
  ];
  dataSource = new RateDataSource(this.ratesFacade);

  loading$ = this.ratesFacade.loading$;

  constructor(
    private readonly overlayService: OverlayService,
    private readonly ratesFacade: RatesFacade,
    private readonly _translocoService: TranslocoService
  ) {}

  ngOnInit() {
    this.ratesFacade.getRates(null);
  }

  showDeleteDialog(rate: Rate) {
    const text = this._translocoService.translate('RATE.LIST.DELETE', {
      rateAmount: rate.amount,
    });
    const overlayRef = this.overlayService.open(text, null);
    overlayRef.afterClosed$.subscribe((res) => {
      if (res.data) {
        this.ratesFacade.deleteRates([rate.id]);
        this.ratesFacade.getRates(null);
      }
    });
  }
}

import { Component, Input, OnInit } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { ChartType } from '@models/enums';
import { Card, ChartData } from '@models/interfaces';

import { ChartDataService } from './chart-data.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  get chartData() {
    return this._data.getValue();
  }

  @Input()
  set chartData(value) {
    this._data.next(value);
  }
  private _data: BehaviorSubject<Card[]> = new BehaviorSubject<Card[]>(null);
  @Input() chartType: ChartType;

  parsedData: ChartData = null;

  constructor(private service: ChartDataService) {}

  ngOnInit(): void {
    this._data.subscribe((data: Card[]) => {
      return (this.parsedData = this.service.parseChartData(
        data,
        this.chartType
      ));
    });
  }
}

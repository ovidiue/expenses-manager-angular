import { Component, Input } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { ChartType } from '@models/enums';
import { Card, ChartData } from '@models/interfaces';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent {
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

  constructor() {}
}

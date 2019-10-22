import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from '@models/enums/chart-type';
import { ChartDataService } from '@components/chart/chart-data.service';
import { Card } from '@models/interfaces/card';
import { BehaviorSubject } from 'rxjs';
import { ChartData } from '@models/interfaces/chart-data';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  @Input() chartType: ChartType;

  parsedData: ChartData = null;
  private _data: BehaviorSubject<Card[]> = new BehaviorSubject<Card[]>(null);

  constructor(private service: ChartDataService) {
  }

  get chartData() {
    return this._data.getValue();
  }

  @Input()
  set chartData(value) {
    this._data.next(value);
  }

  ngOnInit(): void {
    this._data
    .subscribe((data: Card[]) => {
      return this.parsedData = this.service.parseChartData(data, this.chartType);
    });
  }
}

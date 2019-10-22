import { Injectable } from '@angular/core';
import { ChartType } from '@models/enums/chart-type';
import { ChartData } from '@models/interfaces/chart-data';
import { Card } from '@models/interfaces/card';
import reduceProperty from '@utils/reduce-property';

@Injectable({providedIn: 'root'})
export class ChartDataService {

  parseChartData(dataArr: Card[],
                 chartType: ChartType): ChartData {
    switch (chartType) {
      case ChartType.BAR:
        return this.getBarData();
      case ChartType.PIE:
        if (!dataArr) {
          return null;
        }
        return this.getPieData(dataArr, 'name', 'total', 'color');
    }
  }

  private getBarData(): ChartData {
    return null;
  }

  private getPieData(dataArr: Card[],
                     keyLabel: string,
                     keyData: string,
                     keyColor: string): ChartData {
    const nonEmptyArr = dataArr.filter(el => el.total !== 0);
    const labels = reduceProperty(nonEmptyArr, keyLabel);
    const data = reduceProperty(nonEmptyArr, keyData);
    const backgroundColor = reduceProperty(nonEmptyArr, keyColor);
    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor,
        }
      ]
    };
  }
}

import { Injectable } from "@angular/core";
import { ChartType } from "@models/enums/chart-type";
import { Card } from "@models/interfaces/card";
import { ChartData } from "@models/interfaces/chart-data";
import reduceProperty from "@utils/reduce-property";

@Injectable({ providedIn: "root" })
export class ChartDataService {
  parseChartData(dataArr: Card[], chartType: ChartType, chartName: string = ""): ChartData {
    if (!dataArr) {
      return null;
    }

    switch (chartType) {
      case ChartType.BAR:
        return this.getBarData(dataArr, "name", "total", chartName);
      case ChartType.PIE:
        return this.getPieData(dataArr, "name", "total", "color");
    }
  }

  private getBarData(
    dataArr: Card[],
    keyLabel: string,
    keyData: string,
    chartName: string = null
  ): any {
    const nonEmptyArr = dataArr.filter((el) => el.total !== 0);
    const labels = reduceProperty(nonEmptyArr, keyLabel);
    const datasets = [
      {
        label: chartName,
        backgroundColor: "#42A5F5",
        borderColor: "#1E88E5",
        data: reduceProperty(nonEmptyArr, keyData)
      }
    ];
    return {
      labels,
      datasets
    };
  }

  private getPieData(
    dataArr: Card[],
    keyLabel: string,
    keyData: string,
    keyColor: string
  ): ChartData {
    const nonEmptyArr = dataArr.filter((el) => el.total !== 0);
    const labels = reduceProperty(nonEmptyArr, keyLabel);
    const data = reduceProperty(nonEmptyArr, keyData);
    const backgroundColor = reduceProperty(nonEmptyArr, keyColor);
    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor
        }
      ]
    };
  }
}

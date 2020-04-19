import { Injectable } from '@angular/core';
import { ExpenseService } from '@core/services';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ExpenseChartDataService {
  constructor(private service: ExpenseService) {}

  getSimpleStats(): Observable<any> {
    return this.service.getSimpleExpenses().pipe(
      map((resp) => {
        const parsed = this.getArrFromObj(this.groupBy(resp, 'month'));
        const labels = this.extractData(parsed, 'month');
        const dataSet1 = this.extractData(parsed, 'total');
        const dataSet2 = this.extractData(parsed, 'totalPayed');
        const data = {
          labels,
          datasets: [
            {
              data: dataSet1,
              label: 'Total',
              backgroundColor: '#42A5F5',
              borderColor: '#1E88E5',
            },
            {
              data: dataSet2,
              label: 'Payed',
              backgroundColor: '#9CCC65',
              borderColor: '#7CB342',
            },
          ],
        };

        return data;
      })
    );
  }

  groupBy(objectArray, property) {
    return objectArray.reduce(function (acc, obj) {
      const key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);

      return acc;
    }, {});
  }

  getArrFromObj(obj) {
    const result = [];
    const sum = 0;
    for (const key in obj) {
      const total = obj[key].map((e) => e.amount).reduce((sum, e) => (sum += e), sum);
      const totalPayed = obj[key].map((e) => e.payed).reduce((sum, e) => (sum += e), sum);
      const newObj = {
        total: this.round(total),
        totalPayed: this.round(totalPayed),
        month: key,
      };

      result.push(newObj);
    }

    result.forEach((el) => (el.month = moment(el.month).format('MMMM')));

    return result;
  }

  round(value: number): number {
    return Math.round(value * 100) / 100;
  }

  private extractData(parsed: any[], key: string) {
    return parsed.reduce((acc, el) => {
      if (acc.indexOf(el[key]) < 0) {
        acc.push(el[key]);
      }
      return acc;
    }, []);
  }
}

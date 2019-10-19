import { Component, OnInit } from '@angular/core';
import { ChartDataService } from '@components/expense-chart/chart-data.service';

@Component({
  selector: 'app-expense-chart',
  templateUrl: './expense-chart.component.html',
  styleUrls: ['./expense-chart.component.scss']
})
export class ExpenseChartComponent implements OnInit {
  data: any;

  constructor(private service: ChartDataService) {
  }

  ngOnInit() {
    this.service.getSimpleStats().subscribe(resp => {
      this.data = resp;
    });
  }

}

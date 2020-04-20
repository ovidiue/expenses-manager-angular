import { Component, OnInit } from '@angular/core';

import { ExpenseChartDataService } from './expense-chart-data.service';

@Component({
  selector: 'app-expense-chart',
  templateUrl: './expense-chart.component.html',
  styleUrls: ['./expense-chart.component.scss'],
})
export class ExpenseChartComponent implements OnInit {
  data: any;

  constructor(private service: ExpenseChartDataService) {}

  ngOnInit() {
    this.service.getSimpleStats().subscribe((resp) => {
      this.data = resp;
    });
  }
}

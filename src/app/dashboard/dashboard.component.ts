import { Component, OnInit } from '@angular/core';
import { ChartType } from '@models/enums';
import { Card } from '@models/interfaces';
import { Observable } from 'rxjs';

import { DashboardDataService } from './dashboard-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  tagStats$: Observable<Card[]>;
  categoriesStats$: Observable<Card[]>;

  pieChart = ChartType.PIE;
  barChart = ChartType.BAR;

  constructor(private service: DashboardDataService) {}

  ngOnInit() {
    this.tagStats$ = this.service.getTagStats();
    this.categoriesStats$ = this.service.getCategoriesStats();
  }
}

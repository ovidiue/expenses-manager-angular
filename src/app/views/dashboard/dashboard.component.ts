import { Component, OnInit } from '@angular/core';
import { DashboardDataService } from './dashboard-data.service';
import { Observable } from 'rxjs';
import { Card } from '@models/interfaces/card';
import { ChartType } from '@models/enums/chart-type';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  tagStats$: Observable<Card[]>;
  categoriesStats$: Observable<Card[]>;

  pieChart = ChartType.PIE;

  constructor(private service: DashboardDataService) {
  }

  ngOnInit() {
    this.tagStats$ = this.service.getTagStats();
    this.categoriesStats$ = this.service.getCategoriesStats();
  }
}

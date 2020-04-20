import { Component, OnInit } from '@angular/core';

import StatsDataService from './stats-data.service';

@Component({
  selector: 'app-expense-card-list',
  templateUrl: './expense-card-list.component.html',
  styleUrls: ['./expense-card-list.component.scss'],
})
export class ExpenseCardListComponent implements OnInit {
  stats: any;

  constructor(private service: StatsDataService) {}

  ngOnInit() {
    this.service.getStats().subscribe((resp) => {
      this.stats = resp;
    });
  }
}

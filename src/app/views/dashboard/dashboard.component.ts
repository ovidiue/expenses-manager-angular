import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  tabItems = [
    {label: 'Expenses', icon: 'fa fa-fw fa-bar-chart'},
    {label: 'Categories', icon: 'fa fa-fw fa-calendar'},
    {label: 'Tags', icon: 'fa fa-fw fa-book'}
  ];

  constructor() {
  }

  ngOnInit() {
  }

}

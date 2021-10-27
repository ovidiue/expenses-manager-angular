import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';

import { CardViewListComponent } from './card-view-list/card-view-list.component';
import { CardViewComponent } from './card-view/card-view.component';
import { DashboardComponent } from './dashboard.component';

import { SharedModule } from '@shared/shared.module';

const dashboardRoutes: Route[] = [{ path: '', component: DashboardComponent }];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(dashboardRoutes),
    TabViewModule,
    CommonModule,
    CardModule,
  ],
  declarations: [DashboardComponent, CardViewListComponent, CardViewComponent],
})
export class DashboardModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

import { SharedModule } from '@shared/shared.module';

const dashboardRoutes: Route[] = [{ path: '', component: DashboardComponent }];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(dashboardRoutes), CommonModule],
  declarations: [DashboardComponent],
})
export class DashboardModule {}

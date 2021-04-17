import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  CategoriesListComponent,
  CategoryDetailAddComponent,
  CategoryDetailEditComponent,
} from '../category';
import { DashboardComponent } from '../dashboard';
import {
  ExpenseDetailAddComponent,
  ExpenseDetailEditComponent,
  ExpenseListComponent,
} from '../expense';
import { AuthGuard } from '../guards/auth.guard';
import { LoginComponent } from '../login';
import {
  RateDetailAddComponent,
  RateDetailEditComponent,
  RateListComponent,
} from '../rate';
import {
  TagDetailAddComponent,
  TagDetailEditComponent,
  TagListComponent,
} from '../tag';

import { MainComponent } from '@core/main/main.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'home/expenses', pathMatch: 'full' },
  {
    path: 'home',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'expenses',
        pathMatch: 'full',
      },
      {
        path: 'expenses',
        data: {
          displayName: 'Expenses',
        },
        children: [
          { path: '', component: ExpenseListComponent },
          { path: 'add', component: ExpenseDetailAddComponent },
          { path: 'edit/:id', component: ExpenseDetailEditComponent },
        ],
      },
      {
        path: 'rates',
        data: {
          displayName: 'Rates',
        },
        children: [
          { path: '', component: RateListComponent },
          { path: 'add', component: RateDetailAddComponent },
          { path: 'edit/:id', component: RateDetailEditComponent },
        ],
      },
      {
        path: 'categories',
        data: {
          displayName: 'Categories',
        },
        children: [
          { path: '', component: CategoriesListComponent },
          { path: 'add', component: CategoryDetailAddComponent },
          { path: 'edit/:id', component: CategoryDetailEditComponent },
        ],
      },
      {
        path: 'tags',
        data: {
          displayName: 'Tags',
        },
        children: [
          { path: '', component: TagListComponent },
          { path: 'add', component: TagDetailAddComponent },
          { path: 'edit/:id', component: TagDetailEditComponent },
        ],
      },
      {
        path: 'dashboard',
        data: {
          displayName: 'Dashboard',
        },
        component: DashboardComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

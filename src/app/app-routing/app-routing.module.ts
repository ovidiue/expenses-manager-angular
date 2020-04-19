import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';
import { CategoryDetailAddComponent, CategoryDetailEditComponent, CategoryListComponent } from '../views/category';
import { DashboardComponent } from '../views/dashboard';
import { ExpenseDetailAddComponent } from '../views/expense/expense-detail/expense-detail-add.component';
import { ExpenseDetailEditComponent } from '../views/expense/expense-detail/expense-detail-edit.component';
import { ExpenseListComponent } from '../views/expense/expense-list/expense-list.component';
import { LoginComponent } from '../views/login/login.component';
import { MainComponent } from '../views/main/main.component';
import { RateDetailAddComponent } from '../views/rate/rate-detail/rate-detail-add.component';
import { RateDetailEditComponent } from '../views/rate/rate-detail/rate-detail-edit.component';
import { RateListComponent } from '../views/rate/rate-list/rate-list.component';
import { TagDetailAddComponent } from '../views/tag/tag-detail/tag-detail-add.component';
import { TagDetailEditComponent } from '../views/tag/tag-detail/tag-detail-edit.component';
import { TagListComponent } from '../views/tag/tag-list/tag-list.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', redirectTo: 'home/expenses', pathMatch: 'full' },
  {
    path: 'home',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'expenses',
        data: {
          displayName: 'Expenses'
        },
        children: [
          { path: '', component: ExpenseListComponent },
          { path: 'add', component: ExpenseDetailAddComponent },
          { path: 'edit/:id', component: ExpenseDetailEditComponent }
        ]
      },
      {
        path: 'rates',
        data: {
          displayName: 'Rates'
        },
        children: [
          { path: '', component: RateListComponent },
          { path: 'add', component: RateDetailAddComponent },
          { path: 'edit/:id', component: RateDetailEditComponent }
        ]
      },
      {
        path: 'categories',
        data: {
          displayName: 'Categories'
        },
        children: [
          { path: '', component: CategoryListComponent },
          { path: 'add', component: CategoryDetailAddComponent },
          { path: 'edit/:id', component: CategoryDetailEditComponent }
        ]
      },
      {
        path: 'tags',
        data: {
          displayName: 'Tags'
        },
        children: [
          { path: '', component: TagListComponent },
          { path: 'add', component: TagDetailAddComponent },
          { path: 'edit/:id', component: TagDetailEditComponent }
        ]
      },
      {
        path: 'dashboard',
        data: {
          displayName: 'Dashboard'
        },
        component: DashboardComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

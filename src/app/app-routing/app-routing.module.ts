import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';
import { CategoryDetailAddComponent } from '../views/category/category-detail/category-detail-add.component';
import { CategoryDetailEditComponent } from '../views/category/category-detail/category-detail-edit.component';
import { CategoryListComponent } from '../views/category/category-list/category-list.component';
import { DashboardComponent } from '../views/dashboard/dashboard.component';
import { ExpenseDetailAddComponent } from '../views/expense/expense-detail/expense-detail-add.component';
import { ExpenseDetailEditComponent } from '../views/expense/expense-detail/expense-detail-edit.component';
import { ExpenseListComponent } from '../views/expense/expense-list/expense-list.component';
import { LoginComponent } from '../views/login/login.component';
import { RateDetailAddComponent } from '../views/rate/rate-detail/rate-detail-add.component';
import { RateDetailEditComponent } from '../views/rate/rate-detail/rate-detail-edit.component';
import { RateListComponent } from '../views/rate/rate-list/rate-list.component';
import { TagDetailAddComponent } from '../views/tag/tag-detail/tag-detail-add.component';
import { TagDetailEditComponent } from '../views/tag/tag-detail/tag-detail-edit.component';
import { TagListComponent } from '../views/tag/tag-list/tag-list.component';

export const routes: Routes = [
  {path: '', redirectTo: '/expenses', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {
    path: 'expenses',
    data: {
      displayName: 'Expenses'
    },
    canActivate: [AuthGuard],
    children: [
      {path: '', component: ExpenseListComponent},
      {path: 'add', component: ExpenseDetailAddComponent},
      {path: 'edit/:id', component: ExpenseDetailEditComponent},
    ]
  },
  {
    path: 'rates',
    data: {
      displayName: 'Rates'
    },
    children: [
      {path: '', component: RateListComponent},
      {path: 'add', component: RateDetailAddComponent},
      {path: 'edit/:id', component: RateDetailEditComponent},
    ]
  },
  {
    path: 'categories',
    data: {
      displayName: 'Categories'
    },
    children: [
      {path: '', component: CategoryListComponent},
      {path: 'add', component: CategoryDetailAddComponent},
      {path: 'edit/:id', component: CategoryDetailEditComponent}
    ]
  },
  {
    path: 'tags',
    data: {
      displayName: 'Tags'
    },
    children: [
      {path: '', component: TagListComponent},
      {path: 'add', component: TagDetailAddComponent},
      {path: 'edit/:id', component: TagDetailEditComponent}
    ]
  },
  {
    path: 'dashboard',
    data: {
      displayName: 'Dashboard'
    },
    component: DashboardComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

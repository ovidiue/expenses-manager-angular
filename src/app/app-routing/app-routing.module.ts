import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryDetailComponent } from '../views/category/category-detail/category-detail.component';
import { TagDetailAddComponent } from '../views/tag/tag-detail/tag-detail-add.component';
import { ExpenseDetailAddComponent } from '../views/expense/expense-detail/expense-detail-add.component';
import { RateDetailAddComponent } from '../views/rate/rate-detail/rate-detail-add.component';
import { DashboardComponent } from '../views/dashboard/dashboard.component';
import { CategoryDetailEditComponent } from '../views/category/category-detail/category-detail-edit.component';
import { CategoryListComponent } from '../views/category/category-list/category-list.component';
import { RateListComponent } from '../views/rate/rate-list/rate-list.component';
import { TagListComponent } from '../views/tag/tag-list/tag-list.component';
import { ExpenseListComponent } from '../views/expense/expense-list/expense-list.component';
import { TagDetailEditComponent } from '../views/tag/tag-detail/tag-detail-edit.component';
import { RateDetailEditComponent } from '../views/rate/rate-detail/rate-detail-edit.component';
import { ExpenseDetailEditComponent } from '../views/expense/expense-detail/expense-detail-edit.component';
import { LoginComponent } from '../views/login/login.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: '/expenses', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {
    path: 'expenses',
    canActivate: [AuthGuard],
    children: [
      {path: '', component: ExpenseListComponent},
      {path: 'add', component: ExpenseDetailAddComponent},
      {path: 'edit/:id', component: ExpenseDetailEditComponent},
    ]
  },
  {
    path: 'rates',
    children: [
      {path: '', component: RateListComponent},
      {path: 'add', component: RateDetailAddComponent},
      {path: 'edit/:id', component: RateDetailEditComponent},
    ]
  },
  {
    path: 'categories',
    children: [
      {path: '', component: CategoryListComponent},
      {path: 'add', component: CategoryDetailComponent},
      {path: 'edit/:id', component: CategoryDetailEditComponent}
    ]
  },
  {
    path: 'tags',
    children: [
      {path: '', component: TagListComponent},
      {path: 'add', component: TagDetailAddComponent},
      {path: 'edit/:id', component: TagDetailEditComponent}
    ]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

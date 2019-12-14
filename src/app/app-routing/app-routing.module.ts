import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpensesComponent } from '../views/expenses/expenses.component';
import { RatesComponent } from '../views/rates/rates.component';
import { TagsComponent } from '../views/tags/tags.component';
import { CategoryDetailComponent } from '../views/category/category-detail/category-detail.component';
import { TagDetailComponent } from '../views/tag-detail/tag-detail.component';
import { ExpenseDetailComponent } from '../views/expense-detail/expense-detail.component';
import { RateDetailComponent } from '../views/rate-detail/rate-detail.component';
import { DashboardComponent } from '../views/dashboard/dashboard.component';
import { CategoryDetailEditComponent } from '../views/category/category-detail/category-detail-edit.component';
import { CategoryListComponent } from '../views/category/category-list/category-list.component';

const routes: Routes = [
  {path: '', redirectTo: '/expenses', pathMatch: 'full'},
  {
    path: 'expenses',
    children: [
      {path: '', component: ExpensesComponent},
      {path: 'add', component: ExpenseDetailComponent},
      {path: 'edit/:id', component: ExpenseDetailComponent},
    ]
  },
  {
    path: 'rates',
    children: [
      {path: '', component: RatesComponent},
      {path: 'add', component: RateDetailComponent},
      {path: 'edit/:id', component: RateDetailComponent},
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
      {path: '', component: TagsComponent},
      {path: 'add', component: TagDetailComponent},
      {path: 'edit/:id', component: TagDetailComponent}
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

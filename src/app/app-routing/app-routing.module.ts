import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ExpensesComponent} from '../views/expenses/expenses.component';
import {RatesComponent} from '../views/rates/rates.component';
import {CategoriesComponent} from '../views/categories/categories.component';
import {TagsComponent} from '../views/tags/tags.component';
import {CategoryDetailComponent} from '../views/category-detail/category-detail.component';
import {TagDetailComponent} from '../views/tag-detail/tag-detail.component';
import {ExpenseDetailComponent} from '../views/expense-detail/expense-detail.component';
import {RateDetailComponent} from '../views/rate-detail/rate-detail.component';
import {TagDetailEditComponent} from '../views/tag-detail/tag-detail-edit.component';

const routes: Routes = [
  {path: '', redirectTo: '/expenses', pathMatch: 'full'},
  {path: 'expenses', component: ExpensesComponent},
  {path: 'expenses/add', component: ExpenseDetailComponent},
  {path: 'expenses/add/:id', component: ExpenseDetailComponent},
  {path: 'rates', component: RatesComponent},
  {path: 'rates/add', component: RateDetailComponent},
  {path: 'rates/add/:id', component: RateDetailComponent},
  {
    path: 'categories',
    children: [
      {path: '', component: CategoriesComponent},
      {path: 'add', component: CategoryDetailComponent},
      {path: 'add/:id', component: CategoryDetailComponent}
    ]
  },
  {
    path: 'tags',
    children: [
      {path: '', component: TagsComponent},
      {path: 'add', component: TagDetailComponent},
      {path: 'edit/:id', component: TagDetailEditComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

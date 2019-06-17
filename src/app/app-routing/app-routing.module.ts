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

const routes: Routes = [
  {path: '', redirectTo: '/expenses', pathMatch: 'full'},
  {path: 'expenses', component: ExpensesComponent},
  {path: 'expenses/add', component: ExpenseDetailComponent},
  {path: 'expenses/add/:id', component: ExpenseDetailComponent},
  {path: 'rates', component: RatesComponent},
  {path: 'rates/add', component: RateDetailComponent},
  {path: 'rates/add/:id', component: RateDetailComponent},
  {path: 'categories', component: CategoriesComponent},
  {path: 'categories/add', component: CategoryDetailComponent},
  {path: 'categories/add/:id', component: CategoryDetailComponent},
  {path: 'tags', component: TagsComponent},
  {path: 'tags/add', component: TagDetailComponent},
  {path: 'tags/add/:id', component: TagDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

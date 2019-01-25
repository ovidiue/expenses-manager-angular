import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ExpensesComponent} from '../expenses/expenses.component';
import {RatesComponent} from '../rates/rates.component';
import {CategoriesComponent} from '../categories/categories.component';
import {TagsComponent} from '../tags/tags.component';
import {CategoryDetailComponent} from '../category-detail/category-detail.component';

const routes: Routes = [
  {path: '', redirectTo: '/expenses', pathMatch: 'full'},
  {path: 'expenses', component: ExpensesComponent},
  {path: 'rates', component: RatesComponent},
  {path: 'categories', component: CategoriesComponent},
  {path: 'tags', component: TagsComponent},
  {path: 'categories/add', component: CategoryDetailComponent},
  {path: 'categories/add/:id', component: CategoryDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

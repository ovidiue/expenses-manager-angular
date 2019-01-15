import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ExpensesComponent} from '../expenses/expenses.component';
import {RatesComponent} from '../rates/rates.component';
import {CategoriesComponent} from '../categories/categories.component';
import {TagsComponent} from '../tags/tags.component';

const routes: Routes = [
  {path: '', redirectTo: '/expenses', pathMatch: 'full'},
  {path: 'expenses', component: ExpensesComponent},
  {path: 'rates', component: RatesComponent},
  {path: 'categories', component: CategoriesComponent},
  {path: 'tags', component: TagsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

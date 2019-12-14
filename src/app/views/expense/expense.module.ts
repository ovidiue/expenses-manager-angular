import { NgModule } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { ExpenseDetailComponent } from './expense-detail/expense-detail.component';
import { ExpenseFilterComponent } from '@components/expense-filter/expense-filter.component';
import { ShortFilterComponent } from '@components/short-filter/short-filter.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    ExpenseListComponent,
    ExpenseDetailComponent,
    ExpenseFilterComponent,
    ShortFilterComponent
  ]
})
export class ExpenseModule {
}

import { NgModule } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { ExpenseDetailAddComponent } from './expense-detail/expense-detail-add.component';
import { ExpenseFilterComponent } from '@components/expense-filter/expense-filter.component';
import { ShortFilterComponent } from '@components/short-filter/short-filter.component';
import { ExpenseDetailEditComponent } from './expense-detail/expense-detail-edit.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    ExpenseListComponent,
    ExpenseDetailAddComponent,
    ExpenseDetailEditComponent,
    ExpenseFilterComponent,
    ShortFilterComponent
  ]
})
export class ExpenseModule {
}

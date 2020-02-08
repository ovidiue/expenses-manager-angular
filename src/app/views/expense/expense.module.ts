import { NgModule } from '@angular/core';
import { ExpenseFilterComponent } from '@components/expense-filter/expense-filter.component';
import { ShortFilterComponent } from '@components/short-filter/short-filter.component';

import { SharedModule } from '../../modules/shared.module';

import { ExpenseDetailAddComponent } from './expense-detail/expense-detail-add.component';
import { ExpenseDetailEditComponent } from './expense-detail/expense-detail-edit.component';
import { ExpenseListComponent } from './expense-list/expense-list.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    ExpenseListComponent,
    ExpenseDetailAddComponent,
    ExpenseDetailEditComponent,
    ExpenseFilterComponent,
    ShortFilterComponent,
  ]
})
export class ExpenseModule {
}

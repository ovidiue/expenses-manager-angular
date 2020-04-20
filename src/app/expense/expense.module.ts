import { NgModule } from '@angular/core';
import { ShortFilterComponent } from '@components/short-filter/short-filter.component';

import { SharedModule } from '@shared/shared.module';

import { ExpenseDetailAddComponent } from './expense-detail/expense-detail-add.component';
import { ExpenseDetailEditComponent } from './expense-detail/expense-detail-edit.component';
import { ExpenseFilterComponent } from './expense-filter/expense-filter.component';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { AppRowActionsComponent } from './row-actions/row-actions.component';

@NgModule({
  imports: [SharedModule],
  declarations: [
    ExpenseListComponent,
    AppRowActionsComponent,
    ExpenseDetailAddComponent,
    ExpenseDetailEditComponent,
    ExpenseFilterComponent,
    ShortFilterComponent,
  ],
})
export class ExpenseModule {}

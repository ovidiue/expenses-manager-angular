import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { ExpenseCardComponent } from './expense-card/expense-card.component';
import {
  AppRowActionsComponent,
  ExpenseDetailAddComponent,
  ExpenseDetailEditComponent,
  ExpenseFilterComponent,
  ExpenseListComponent
} from './index';

@NgModule({
  imports: [SharedModule],
  declarations: [
    ExpenseListComponent,
    AppRowActionsComponent,
    ExpenseDetailAddComponent,
    ExpenseDetailEditComponent,
    ExpenseFilterComponent,
    ExpenseCardComponent,
  ],
})
export class ExpenseModule {}

import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

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
  ],
})
export class ExpenseModule {}

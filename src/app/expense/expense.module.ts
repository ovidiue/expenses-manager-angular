import { NgModule } from '@angular/core';
import { TranslocoRootModule } from "../transloco/transloco-root.module";

import { ExpenseCardComponent } from './expense-card/expense-card.component';
import {
  AppRowActionsComponent,
  ExpenseDetailAddComponent,
  ExpenseDetailEditComponent,
  ExpenseFilterComponent,
  ExpenseListComponent,
} from './index';

import { SvgIconsModule } from '@ngneat/svg-icon';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [SharedModule, SvgIconsModule, TranslocoRootModule],
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

import { NgModule } from '@angular/core';

import { TranslocoRootModule } from '../transloco/transloco-root.module';
import { ExpenseCardComponent } from './expense-card/expense-card.component';
import { ExpenseDetailBaseComponent } from './expense-detail/expense-detail-base.component';
import {
  AppRowActionsComponent,
  ExpenseDetailAddComponent,
  ExpenseDetailEditComponent,
  ExpenseFilterComponent,
  ExpenseListComponent,
} from './index';

import { SvgIconsModule } from '@ngneat/svg-icon';
import { NoDataModule } from '@shared/components/noData/no-data.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [SharedModule, SvgIconsModule, TranslocoRootModule, NoDataModule],
  declarations: [
    ExpenseListComponent,
    AppRowActionsComponent,
    ExpenseDetailAddComponent,
    ExpenseDetailEditComponent,
    ExpenseFilterComponent,
    ExpenseCardComponent,
    ExpenseDetailBaseComponent,
  ],
})
export class ExpenseModule {}

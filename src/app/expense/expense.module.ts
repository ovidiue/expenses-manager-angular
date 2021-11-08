import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';

import { TranslocoRootModule } from '../transloco/transloco-root.module';
import { ExpenseCardComponent } from './expense-card/expense-card.component';
import { ExpenseDetailBaseComponent } from './expense-detail/expense-detail-base.component';
import {
  ExpenseDetailAddComponent,
  ExpenseDetailEditComponent,
  ExpenseListComponent,
} from './index';

import { SvgIconsModule } from '@ngneat/svg-icon';
import { FormGroupModule } from '@shared/components/form-group';
import { NoDataModule } from '@shared/components/noData/no-data.module';
import { MaterialModule } from '@shared/material.module';
import { SharedModule } from '@shared/shared.module';

const expensesRoutes: Route[] = [
  { path: '', component: ExpenseListComponent },
  { path: 'add', component: ExpenseDetailAddComponent },
  { path: 'edit/:id', component: ExpenseDetailEditComponent },
];

@NgModule({
  imports: [
    SharedModule,
    SvgIconsModule,
    TranslocoRootModule,
    NoDataModule,
    RouterModule.forChild(expensesRoutes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FormGroupModule,
    CdkTableModule,
  ],
  declarations: [
    ExpenseListComponent,
    ExpenseDetailAddComponent,
    ExpenseDetailEditComponent,
    ExpenseCardComponent,
    ExpenseDetailBaseComponent,
  ],
})
export class ExpenseModule {}

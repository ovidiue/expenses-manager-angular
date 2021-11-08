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

const vendorImports = [SvgIconsModule, MaterialModule, CdkTableModule];

@NgModule({
  imports: [
    ...vendorImports,
    SharedModule,
    TranslocoRootModule,
    NoDataModule,
    RouterModule.forChild(expensesRoutes),
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FormGroupModule,
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

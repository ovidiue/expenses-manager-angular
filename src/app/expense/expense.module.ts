import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';

import { AccordionModule } from 'primeng/accordion';
import { CardModule } from 'primeng/card';
import { SliderModule } from 'primeng/slider';

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
    AccordionModule,
    CardModule,
    SliderModule,
  ],
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

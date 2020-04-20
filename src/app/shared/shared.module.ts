import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  CardViewComponent,
  CardViewListComponent,
  ChartComponent,
  DialogComponent,
  DialogRatesComponent,
  ExpenseCardListComponent,
  ExpenseChartComponent,
  PageSpinnerComponent,
  ShortFilterComponent
} from '@shared/components';

import { PrimengModule } from './primeng.module';

const importsExports = [
  FormsModule,
  ReactiveFormsModule,
  PrimengModule,
  CommonModule,
];

@NgModule({
  imports: [BrowserAnimationsModule, PrimengModule, CommonModule],
  exports: [
    ...importsExports,
    PageSpinnerComponent,
    DialogComponent,
    ShortFilterComponent,
    ExpenseCardListComponent,
    ExpenseChartComponent,
  ],
  declarations: [
    PageSpinnerComponent,
    DialogComponent,
    DialogRatesComponent,
    ExpenseCardListComponent,
    CardViewComponent,
    CardViewListComponent,
    ExpenseChartComponent,
    ChartComponent,
    ShortFilterComponent,
  ],
  entryComponents: [DialogRatesComponent],
})
export class SharedModule {}

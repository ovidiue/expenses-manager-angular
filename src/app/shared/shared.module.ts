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
  ShortFilterComponent,
} from '@shared/components';

import { PrimengModule } from './primeng.module';
import { LabelComponent } from '@shared/components/label/label.component';
import { ErrorComponent } from '@shared/components/error/error.component';

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
    LabelComponent,
    ErrorComponent,
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
    LabelComponent,
    ErrorComponent,
  ],
  entryComponents: [DialogRatesComponent],
})
export class SharedModule {}

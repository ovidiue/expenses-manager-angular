import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PrimengModule } from './primeng.module';

import { SvgIconsModule } from '@ngneat/svg-icon';
import { CdkModule } from '@shared/cdk.module';
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
import { ButtonComponent } from '@shared/components/button/button/button.component';
import { ErrorComponent } from '@shared/components/error/error.component';
import { LabelComponent } from '@shared/components/label/label.component';
import { MaterialModule } from '@shared/material.module';
import { OverlayComponent } from '@shared/modal/overlay.component';

const importsExports = [
  FormsModule,
  ReactiveFormsModule,
  PrimengModule,
  MaterialModule,
  CommonModule,
  CdkModule,
];

@NgModule({
  imports: [
    BrowserAnimationsModule,
    PrimengModule,
    CommonModule,
    MaterialModule,
    SvgIconsModule,
  ],
  exports: [
    ...importsExports,
    PageSpinnerComponent,
    DialogComponent,
    ShortFilterComponent,
    ExpenseCardListComponent,
    ExpenseChartComponent,
    LabelComponent,
    ErrorComponent,
    ButtonComponent,
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
    ButtonComponent,
    OverlayComponent,
  ],
  entryComponents: [DialogRatesComponent],
})
export class SharedModule {}

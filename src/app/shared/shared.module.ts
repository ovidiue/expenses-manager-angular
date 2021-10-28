import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TranslocoRootModule } from '../transloco/transloco-root.module';
import { PrimengModule } from './primeng.module';

import { SvgIconsModule } from '@ngneat/svg-icon';
import { CdkModule } from '@shared/cdk.module';
import {
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

const importsExports = [CdkModule];

@NgModule({
  imports: [PrimengModule, MaterialModule, SvgIconsModule, TranslocoRootModule, CommonModule],
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

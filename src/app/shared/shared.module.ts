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
import { ErrorsComponent } from '@shared/components/error/errors.component';
import { LabelsComponent } from '@shared/components/label/labels.component';
import { MaterialModule } from '@shared/material.module';
import { OverlayComponent } from '@shared/modal/overlay.component';
import { LottieModule } from 'ngx-lottie';

const importsExports = [CdkModule];

@NgModule({
  imports: [
    PrimengModule,
    MaterialModule,
    SvgIconsModule,
    TranslocoRootModule,
    CommonModule,
    LottieModule,
  ],
  exports: [
    ...importsExports,
    PageSpinnerComponent,
    DialogComponent,
    ShortFilterComponent,
    ExpenseCardListComponent,
    ExpenseChartComponent,
    LabelsComponent,
    ErrorsComponent,
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
    LabelsComponent,
    ErrorsComponent,
    ButtonComponent,
    OverlayComponent,
  ],
  entryComponents: [DialogRatesComponent],
})
export class SharedModule {}

import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';

import { TranslocoRootModule } from '../transloco/transloco-root.module';
import {
  RateDetailAddComponent,
  RateDetailEditComponent,
  RateListComponent,
} from './index';
import { RateDetailBaseComponent } from './rate-detail/rate-detail-base.component';

import { SvgIconsModule } from '@ngneat/svg-icon';
import { FormGroupModule } from '@shared/components/form-group';
import { MaterialModule } from '@shared/material.module';
import { SharedModule } from '@shared/shared.module';

const ratesRoutes: Route[] = [
  { path: '', component: RateListComponent },
  { path: 'add', component: RateDetailAddComponent },
  { path: 'edit/:id', component: RateDetailEditComponent },
];

const vendorImports = [SvgIconsModule, MaterialModule, CdkTableModule];

@NgModule({
  imports: [
    ...vendorImports,
    SharedModule,
    TranslocoRootModule,
    RouterModule.forChild(ratesRoutes),
    ReactiveFormsModule,
    CommonModule,
    FormGroupModule,
  ],
  declarations: [
    RateListComponent,
    RateDetailAddComponent,
    RateDetailEditComponent,
    RateDetailBaseComponent,
  ],
})
export class RateModule {}

import { NgModule } from '@angular/core';

import { TranslocoRootModule } from '../transloco/transloco-root.module';
import {
  RateDetailAddComponent,
  RateDetailEditComponent,
  RateListComponent,
} from './index';
import { RateDetailBaseComponent } from './rate-detail/rate-detail-base.component';

import { SvgIconsModule } from '@ngneat/svg-icon';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [SharedModule, SvgIconsModule, TranslocoRootModule],
  declarations: [
    RateListComponent,
    RateDetailAddComponent,
    RateDetailEditComponent,
    RateDetailBaseComponent,
  ],
})
export class RateModule {}

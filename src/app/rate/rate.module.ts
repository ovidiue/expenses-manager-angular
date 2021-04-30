import { NgModule } from '@angular/core';
import { SvgIconsModule } from '@ngneat/svg-icon';
import { SharedModule } from '@shared/shared.module';
import { TranslocoRootModule } from "../transloco/transloco-root.module";

import { RateDetailAddComponent, RateDetailEditComponent, RateListComponent } from './index';

@NgModule({
  imports: [SharedModule, SvgIconsModule, TranslocoRootModule],
  declarations: [
    RateListComponent,
    RateDetailAddComponent,
    RateDetailEditComponent,
  ],
})
export class RateModule {}

import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { RateDetailAddComponent, RateDetailEditComponent, RateListComponent } from './index';

@NgModule({
  imports: [SharedModule],
  declarations: [
    RateListComponent,
    RateDetailAddComponent,
    RateDetailEditComponent,
  ],
})
export class RateModule {}

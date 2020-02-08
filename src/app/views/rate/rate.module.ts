import { NgModule } from '@angular/core';

import { SharedModule } from '../../modules/shared.module';

import { RateDetailAddComponent } from './rate-detail/rate-detail-add.component';
import { RateDetailEditComponent } from './rate-detail/rate-detail-edit.component';
import { RateListComponent } from './rate-list/rate-list.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    RateListComponent,
    RateDetailAddComponent,
    RateDetailEditComponent
  ]
})
export class RateModule {
}

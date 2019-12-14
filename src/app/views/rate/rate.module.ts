import { NgModule } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { RateListComponent } from './rate-list/rate-list.component';
import { RateDetailComponent } from './rate-detail/rate-detail.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    RateListComponent,
    RateDetailComponent
  ]
})
export class RateModule {
}

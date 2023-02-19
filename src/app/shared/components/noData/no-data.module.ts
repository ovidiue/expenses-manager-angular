import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NoDataComponent } from '@shared/components/noData/no-data.component';
import { LottieModule } from 'ngx-lottie';

@NgModule({
  imports: [LottieModule, CommonModule],
  declarations: [NoDataComponent],
  exports: [NoDataComponent],
})
export class NoDataModule {}

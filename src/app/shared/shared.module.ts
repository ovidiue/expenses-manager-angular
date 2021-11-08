import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SvgIconsModule } from '@ngneat/svg-icon';
import { PageSpinnerComponent } from '@shared/components';
import { ButtonComponent } from '@shared/components/button/button/button.component';
import { MaterialModule } from '@shared/material.module';
import { OverlayComponent } from '@shared/modal/overlay.component';
import { LottieModule } from 'ngx-lottie';

const importsExports = [];

@NgModule({
  imports: [MaterialModule, SvgIconsModule, CommonModule, LottieModule],
  exports: [...importsExports, PageSpinnerComponent, ButtonComponent],
  declarations: [PageSpinnerComponent, ButtonComponent, OverlayComponent],
})
export class SharedModule {}

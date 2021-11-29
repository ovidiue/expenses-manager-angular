import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SvgIconsModule } from '@ngneat/svg-icon';
import { TranslocoModule } from '@ngneat/transloco';
import { PageSpinnerComponent } from '@shared/components';
import { ButtonComponent } from '@shared/components/button/button/button.component';
import { MaterialModule } from '@shared/material.module';
import { OverlayComponent } from '@shared/modal/overlay.component';
import { LottieModule } from 'ngx-lottie';

const vendorImports = [MaterialModule, SvgIconsModule, LottieModule];

const declarationsAndExports = [PageSpinnerComponent, ButtonComponent];

@NgModule({
  imports: [...vendorImports, CommonModule, TranslocoModule],
  exports: [...declarationsAndExports],
  declarations: [...declarationsAndExports, OverlayComponent],
})
export class SharedModule {}

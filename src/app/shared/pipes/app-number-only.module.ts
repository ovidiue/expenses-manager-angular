import { NgModule } from '@angular/core';

import { AppNumberOnlyDirective } from '@shared/pipes/app-number-only.directive';

const declarationsAndExports = [AppNumberOnlyDirective];

@NgModule({
  declarations: [...declarationsAndExports],
  exports: [...declarationsAndExports],
})
export class AppNumberOnlyModule {}

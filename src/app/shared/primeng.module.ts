import { NgModule } from '@angular/core';

import { ColorPickerModule } from 'primeng/colorpicker';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SliderModule } from 'primeng/slider';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';

const importsAndExports = [
  ColorPickerModule,
  SliderModule,
  TabMenuModule,
  TabViewModule,
  ProgressSpinnerModule,
];

@NgModule({
  declarations: [],
  imports: [...importsAndExports],
  exports: [...importsAndExports],
})
export class PrimengModule {}

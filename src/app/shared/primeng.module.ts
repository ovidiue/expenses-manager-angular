import { NgModule } from '@angular/core';

import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SidebarModule } from 'primeng/sidebar';
import { SliderModule } from 'primeng/slider';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';

const importsAndExports = [
  TableModule,
  AccordionModule,
  CalendarModule,
  CheckboxModule,
  ColorPickerModule,
  ConfirmDialogModule,
  DropdownModule,
  MultiSelectModule,
  OverlayPanelModule,
  ScrollPanelModule,
  SidebarModule,
  SplitButtonModule,
  ToolbarModule,
  TooltipModule,
  ChipsModule,
  SliderModule,
  DialogModule,
  DynamicDialogModule,
  ToastModule,
  ButtonModule,
  TabMenuModule,
  CardModule,
  TabViewModule,
  ProgressSpinnerModule,
  ChartModule,
];

@NgModule({
  declarations: [],
  imports: [...importsAndExports],
  exports: [...importsAndExports],
})
export class PrimengModule {}

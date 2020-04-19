import { NgModule } from '@angular/core';
import {
  AccordionModule,
  ButtonModule,
  CardModule,
  ChartModule,
  CheckboxModule,
  ChipsModule,
  ColorPickerModule,
  ConfirmDialogModule,
  DialogModule,
  DropdownModule,
  MultiSelectModule,
  OverlayPanelModule,
  ProgressSpinnerModule,
  ScrollPanelModule,
  SidebarModule,
  SliderModule,
  SplitButtonModule,
  TabMenuModule,
  TabViewModule,
  ToolbarModule,
  TooltipModule
} from 'primeng';
import { CalendarModule } from 'primeng/calendar';
import { DynamicDialogModule } from 'primeng/dynamicdialog';

import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

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
  imports: importsAndExports,
  exports: importsAndExports,
})
export class PrimengModule {}

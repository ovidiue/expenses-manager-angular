import { NgModule } from '@angular/core';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import {
  AccordionModule,
  ButtonModule,
  CalendarModule,
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
  TooltipModule,
} from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [],
  imports: [
    TableModule,
    AccordionModule,
    CalendarModule,
    CheckboxModule,
    ColorPickerModule,
    ConfirmDialogModule,
    DropdownModule,
    MultiSelectModule,
    OverlayPanelModule,
    ScrollPanelModule, SidebarModule, SplitButtonModule,
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
    ChartModule
  ],
  exports: [
    TableModule,
    AccordionModule,
    CalendarModule,
    CheckboxModule,
    ColorPickerModule,
    ConfirmDialogModule,
    DropdownModule,
    MultiSelectModule,
    OverlayPanelModule,
    ScrollPanelModule, SidebarModule, SplitButtonModule,
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
    ChartModule
  ]
})
export class PrimengModule {
}

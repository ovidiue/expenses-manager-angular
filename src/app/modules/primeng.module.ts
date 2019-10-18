import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import {
  AccordionModule,
  ButtonModule,
  CalendarModule,
  CardModule,
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
import { DynamicDialogModule } from 'primeng/dynamicdialog';
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
    ProgressSpinnerModule
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
    ProgressSpinnerModule
  ]
})
export class PrimengModule {
}

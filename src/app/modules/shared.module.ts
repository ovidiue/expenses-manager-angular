import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { DialogComponent } from "@components/dialog/dialog.component";
import { PageSpinnerComponent } from "@components/page-spinner/page-spinner.component";

import { PrimengModule } from "./primeng.module";

const importsExports = [
  FormsModule,
  RouterModule,
  ReactiveFormsModule,
  PrimengModule,
  CommonModule
];

@NgModule({
  imports: [...importsExports, BrowserAnimationsModule],
  exports: [...importsExports, PageSpinnerComponent, DialogComponent],
  declarations: [PageSpinnerComponent, DialogComponent]
})
export class SharedModule {
}

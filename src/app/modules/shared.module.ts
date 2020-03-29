import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogComponent } from '@components/dialog/dialog.component';
import { PageSpinnerComponent } from '@components/page-spinner/page-spinner.component';
import { ToastrModule } from 'ngx-toastr';

import { PrimengModule } from './primeng.module';

const importsExports = [
  CommonModule,
  BrowserModule,
  FormsModule,
  ReactiveFormsModule,
  PrimengModule
];

@NgModule({
  imports: [
    ...importsExports,
    BrowserAnimationsModule,
    ToastrModule.forRoot({progressBar: true, maxOpened: 1}),
  ],
  exports: [
    ...importsExports,
    PageSpinnerComponent,
    DialogComponent
  ],
  declarations: [
    PageSpinnerComponent,
    DialogComponent
  ]
})
export class SharedModule {
}

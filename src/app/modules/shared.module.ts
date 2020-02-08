import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageSpinnerComponent } from '@components/page-spinner/page-spinner.component';
import { ToastrModule } from 'ngx-toastr';

import { PrimengModule } from './primeng.module';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({progressBar: true}),
  ],
  exports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    PageSpinnerComponent,
    PrimengModule,
  ],
  declarations: [
    PageSpinnerComponent
  ]
})
export class SharedModule {
}

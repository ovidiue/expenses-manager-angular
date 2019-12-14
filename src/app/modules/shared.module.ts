import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { PrimengModule } from './primeng.module';
import { PageSpinnerComponent } from '@components/page-spinner/page-spinner.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengModule,
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

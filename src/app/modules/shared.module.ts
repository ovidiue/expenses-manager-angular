import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { PrimengModule } from './primeng.module';
import { PageSpinnerComponent } from '@components/page-spinner/page-spinner.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

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

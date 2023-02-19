import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from '../app-routing/app-routing.module';
import { TranslocoRootModule } from '../transloco/transloco-root.module';
import { HeaderComponent, MainComponent } from './index';

import { ToastrModule } from 'ngx-toastr';

const importsAndExports = [HttpClientModule, AppRoutingModule];

@NgModule({
  imports: [
    ...importsAndExports,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    ToastrModule.forRoot({
      progressBar: true,
      maxOpened: 1,
      closeButton: true,
      extendedTimeOut: 1,
    }),
    TranslocoRootModule,
  ],
  exports: [...importsAndExports],
  declarations: [MainComponent, HeaderComponent],
})
export class CoreModule {}

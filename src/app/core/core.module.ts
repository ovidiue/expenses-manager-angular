import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from '../app-routing/app-routing.module';

import { HeaderComponent, MainComponent } from './index';

const importsAndExports = [HttpClientModule, AppRoutingModule];

@NgModule({
  imports: [
    ...importsAndExports,
    CommonModule,
    ToastrModule.forRoot({
      progressBar: true,
      maxOpened: 1,
      closeButton: true,
      extendedTimeOut: 1
    }),
  ],
  exports: [...importsAndExports],
  declarations: [MainComponent, HeaderComponent],
})
export class CoreModule {}

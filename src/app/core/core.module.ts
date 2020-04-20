import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { HeaderComponent } from '@core/header/header.component';
import { MainComponent } from '@core/main';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from '../app-routing/app-routing.module';

@NgModule({
  imports: [
    HttpClientModule,
    ToastrModule.forRoot({ progressBar: true, maxOpened: 1 }),
    AppRoutingModule,
    CommonModule,
  ],
  exports: [HttpClientModule, ToastrModule, AppRoutingModule],
  declarations: [MainComponent, HeaderComponent],
})
export class CoreModule {}

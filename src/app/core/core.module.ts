import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [CommonModule, HttpClientModule, ToastrModule.forRoot({progressBar: true, maxOpened: 1})],
  exports: [CommonModule, HttpClientModule, ToastrModule]
})
export class CoreModule {

}

import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ToastrModule } from "ngx-toastr";

@NgModule({
  imports: [HttpClientModule, ToastrModule.forRoot({ progressBar: true, maxOpened: 1 })],
  exports: [HttpClientModule, ToastrModule]
})
export class CoreModule {
}

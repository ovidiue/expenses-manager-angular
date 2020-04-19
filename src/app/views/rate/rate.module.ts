import { NgModule } from "@angular/core";
import { CoreModule } from "../../core/core.module";

import { SharedModule } from "../../modules/shared.module";

import { RateDetailAddComponent } from "./rate-detail/rate-detail-add.component";
import { RateDetailEditComponent } from "./rate-detail/rate-detail-edit.component";
import { RateListComponent } from "./rate-list/rate-list.component";

@NgModule({
  imports: [SharedModule, CoreModule],
  declarations: [RateListComponent, RateDetailAddComponent, RateDetailEditComponent]
})
export class RateModule {
}

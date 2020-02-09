import { NgModule } from '@angular/core';

import { SharedModule } from '../../modules/shared.module';

import { TagDataService } from './tag-data.service';
import { TagDetailAddComponent } from './tag-detail/tag-detail-add.component';
import { TagDetailEditComponent } from './tag-detail/tag-detail-edit.component';
import { TagListComponent } from './tag-list/tag-list.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    TagListComponent,
    TagDetailAddComponent,
    TagDetailEditComponent
  ],
  providers: [TagDataService]
})
export class TagModule {
}

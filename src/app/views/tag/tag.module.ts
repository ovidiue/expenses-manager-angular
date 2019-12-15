import { NgModule } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { TagListComponent } from './tag-list/tag-list.component';
import { TagDetailAddComponent } from './tag-detail/tag-detail-add.component';
import { TagDetailEditComponent } from './tag-detail/tag-detail-edit.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    TagListComponent,
    TagDetailAddComponent,
    TagDetailEditComponent
  ]
})
export class TagModule {
}

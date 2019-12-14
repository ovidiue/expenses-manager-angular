import { NgModule } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { TagListComponent } from './tag-list/tag-list.component';
import { TagDetailComponent } from './tag-detail/tag-detail.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    TagListComponent,
    TagDetailComponent
  ]
})
export class TagModule {
}

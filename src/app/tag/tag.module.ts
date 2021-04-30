import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { TranslocoRootModule } from "../transloco/transloco-root.module";

import { TagFacade } from './tag.facade';
import { TagDetailAddComponent } from './tag-detail/tag-detail-add.component';
import { TagDetailEditComponent } from './tag-detail/tag-detail-edit.component';
import { TagListComponent } from './tag-list/tag-list.component';
import { SvgIconsModule } from '@ngneat/svg-icon';

@NgModule({
  imports: [SharedModule, SvgIconsModule, TranslocoRootModule],
  declarations: [
    TagListComponent,
    TagDetailAddComponent,
    TagDetailEditComponent,
  ],
  providers: [TagFacade],
})
export class TagModule {}

import { NgModule } from '@angular/core';

import { TranslocoRootModule } from '../transloco/transloco-root.module';
import { TagDetailAddComponent } from './tag-detail/tag-detail-add.component';
import { TagDetailBaseComponent } from './tag-detail/tag-detail-base.component';
import { TagDetailEditComponent } from './tag-detail/tag-detail-edit.component';
import { TagListComponent } from './tag-list/tag-list.component';
import { TagFacade } from './tag.facade';

import { SvgIconsModule } from '@ngneat/svg-icon';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [SharedModule, SvgIconsModule, TranslocoRootModule],
  declarations: [
    TagListComponent,
    TagDetailAddComponent,
    TagDetailEditComponent,
    TagDetailBaseComponent,
  ],
  providers: [TagFacade],
})
export class TagModule {}

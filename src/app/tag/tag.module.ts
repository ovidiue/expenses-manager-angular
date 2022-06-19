import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';

import { TranslocoRootModule } from '../transloco/transloco-root.module';
import { TagDetailAddComponent } from './tag-detail/tag-detail-add.component';
import { TagDetailBaseComponent } from './tag-detail/tag-detail-base.component';
import { TagDetailEditComponent } from './tag-detail/tag-detail-edit.component';
import { TagListComponent } from './tag-list/tag-list.component';
import { TagFacade } from './tag.facade';

import { SvgIconsModule } from '@ngneat/svg-icon';
import { FormGroupModule } from '@shared/components/form-group';
import { MaterialModule } from '@shared/material.module';
import { SharedModule } from '@shared/shared.module';

const tagRoutes: Route[] = [
  { path: '', component: TagListComponent },
  { path: 'add', component: TagDetailAddComponent },
  { path: 'edit/:id', component: TagDetailEditComponent },
];

const vendorImports = [SvgIconsModule, MaterialModule, CdkTableModule];

@NgModule({
  imports: [
    ...vendorImports,
    SharedModule,
    TranslocoRootModule,
    RouterModule.forChild(tagRoutes),
    ReactiveFormsModule,
    CommonModule,
    FormGroupModule,
  ],
  declarations: [
    TagListComponent,
    TagDetailAddComponent,
    TagDetailEditComponent,
    TagDetailBaseComponent,
  ],
  providers: [TagFacade],
})
export class TagModule {}

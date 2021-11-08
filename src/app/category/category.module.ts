import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';

import { ColorPickerModule } from 'primeng/colorpicker';

import { TranslocoRootModule } from '../transloco/transloco-root.module';
import { CategoryDetailBaseComponent } from './category-detail/category-detail-base.component';
import { CategoryFacade } from './category.facade';
import {
  CategoriesListComponent,
  CategoryDetailAddComponent,
  CategoryDetailEditComponent,
} from './index';

import { SvgIconsModule } from '@ngneat/svg-icon';
import { FormGroupModule } from '@shared/components/form-group';
import { MaterialModule } from '@shared/material.module';
import { SharedModule } from '@shared/shared.module';

const categoryRoutes: Route[] = [
  { path: '', component: CategoriesListComponent },
  { path: 'add', component: CategoryDetailAddComponent },
  { path: 'edit/:id', component: CategoryDetailEditComponent },
];

@NgModule({
  imports: [
    SharedModule,
    SvgIconsModule,
    TranslocoRootModule,
    RouterModule.forChild(categoryRoutes),
    MaterialModule,
    ReactiveFormsModule,
    ColorPickerModule,
    CommonModule,
    FormGroupModule,
    CdkTableModule,
  ],
  declarations: [
    CategoryDetailEditComponent,
    CategoriesListComponent,
    CategoryDetailAddComponent,
    CategoryDetailBaseComponent,
  ],
  providers: [CategoryFacade],
})
export class CategoryModule {}

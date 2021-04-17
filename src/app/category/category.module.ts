import { NgModule } from '@angular/core';

import { CategoryFacade } from './category.facade';
import {
  CategoriesListComponent,
  CategoryDetailAddComponent,
  CategoryDetailEditComponent,
} from './index';

import { SvgIconsModule } from '@ngneat/svg-icon';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [SharedModule, SvgIconsModule],
  declarations: [
    CategoryDetailEditComponent,
    CategoriesListComponent,
    CategoryDetailAddComponent,
  ],
  providers: [CategoryFacade],
})
export class CategoryModule {}

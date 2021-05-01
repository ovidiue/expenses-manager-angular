import { NgModule } from '@angular/core';

import { TranslocoRootModule } from '../transloco/transloco-root.module';
import { CategoryDetailBaseComponent } from './category-detail/category-detail-base.component';
import { CategoryFacade } from './category.facade';
import {
  CategoriesListComponent,
  CategoryDetailAddComponent,
  CategoryDetailEditComponent,
} from './index';

import { SvgIconsModule } from '@ngneat/svg-icon';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [SharedModule, SvgIconsModule, TranslocoRootModule],
  declarations: [
    CategoryDetailEditComponent,
    CategoriesListComponent,
    CategoryDetailAddComponent,
    CategoryDetailBaseComponent,
  ],
  providers: [CategoryFacade],
})
export class CategoryModule {}

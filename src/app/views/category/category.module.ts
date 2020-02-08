import { NgModule } from '@angular/core';

import { SharedModule } from '../../modules/shared.module';

import { CategoryDetailEditComponent } from './category-detail/category-detail-edit.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { CategoryListComponent } from './category-list/category-list.component';

@NgModule({
  imports: [
    SharedModule
  ],
  exports: [],
  declarations: [
    CategoryDetailEditComponent,
    CategoryListComponent,
    CategoryDetailComponent
  ]
})
export class CategoryModule {
}

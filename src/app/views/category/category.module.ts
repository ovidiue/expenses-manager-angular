import { NgModule } from '@angular/core';
import { CategoryDetailEditComponent } from './category-detail/category-detail-edit.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { SharedModule } from '../../modules/shared.module';

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

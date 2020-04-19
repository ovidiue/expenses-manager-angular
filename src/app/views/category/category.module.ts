import { NgModule } from '@angular/core';
import { CoreModule } from '../../core/core.module';

import { SharedModule } from '../../modules/shared.module';

import { CategoryDataService } from './category-data.service';
import { CategoryDetailAddComponent } from './category-detail/category-detail-add.component';
import { CategoryDetailEditComponent } from './category-detail/category-detail-edit.component';
import { CategoryListComponent } from './category-list/category-list.component';

@NgModule({
  imports: [
    SharedModule,
    CoreModule
  ],
  exports: [],
  declarations: [
    CategoryDetailEditComponent,
    CategoryListComponent,
    CategoryDetailAddComponent
  ],
  providers: [CategoryDataService]
})
export class CategoryModule {
}

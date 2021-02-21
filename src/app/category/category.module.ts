import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { CategoryFacade } from './category.facade';
import { CategoryDetailAddComponent, CategoryDetailEditComponent, CategoryListComponent } from './index';

@NgModule({
  imports: [SharedModule],
  declarations: [
    CategoryDetailEditComponent,
    CategoryListComponent,
    CategoryDetailAddComponent,
  ],
  providers: [CategoryFacade],
})
export class CategoryModule {}

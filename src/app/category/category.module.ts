import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { CategoryDataService } from './category-data.service';
import { CategoryDetailAddComponent, CategoryDetailEditComponent, CategoryListComponent } from './index';

@NgModule({
  imports: [SharedModule],
  declarations: [
    CategoryDetailEditComponent,
    CategoryListComponent,
    CategoryDetailAddComponent,
  ],
  providers: [CategoryDataService],
})
export class CategoryModule {}

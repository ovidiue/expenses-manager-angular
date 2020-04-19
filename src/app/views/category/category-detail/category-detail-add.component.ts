import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutePaths } from '@models/enums/route-paths';
import { fadeIn } from '@utils/animations/fadeIn';

import { CategoryDataService } from '../category-data.service';

import { CategoryDetailBaseComponent } from './category-detail-base.component';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss'],
  animations: [fadeIn],
})
export class CategoryDetailAddComponent extends CategoryDetailBaseComponent
  implements OnInit {
  constructor(
    protected location: Location,
    protected router: Router,
    protected service: CategoryDataService,
    protected route: ActivatedRoute
  ) {
    super(location, service);
    this.pageTitle = 'Create category';
  }

  get name() {
    return this.categoryForm.get('name');
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.nameExists || this.categoryForm.invalid) {
      return;
    }

    this.service.saveCategory(this.categoryForm.value).subscribe(() => {
      this.router.navigate([RoutePaths.CATEGORY_LISTING]);
    });
  }
}

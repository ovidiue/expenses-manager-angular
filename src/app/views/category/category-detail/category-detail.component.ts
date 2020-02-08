import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutePaths } from '@models/enums/route-paths';
import { GlobalNotificationService } from '@services/global-notification.service';
import { fadeIn } from '@utils/animations/fadeIn';
import { MESSAGES } from '@utils/messages';

import { CategoryDetailBaseComponent } from './category-detail-base.component';
import { CategoryDetailDataService } from './category-detail-data.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss'],
  animations: [fadeIn]
})
export class CategoryDetailComponent extends CategoryDetailBaseComponent implements OnInit {
  constructor(
    protected location: Location,
    protected router: Router,
    protected service: CategoryDetailDataService,
    protected globalNotificationService: GlobalNotificationService,
    protected route: ActivatedRoute
  ) {
    super(location, router, service, globalNotificationService, route);
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

    this.service.saveCategory(this.categoryForm.value)
      .subscribe(() => {
        this.router.navigate([RoutePaths.CATEGORY_LISTING]);
        this.globalNotificationService.add(MESSAGES.CATEGORY.ADD);
      });
  }
}

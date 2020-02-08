import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '@models/category';
import { RoutePaths } from '@models/enums/route-paths';
import { GlobalNotificationService } from '@services/global-notification.service';
import { fadeIn } from '@utils/animations/fadeIn';
import { MESSAGES } from '@utils/messages';
import { pluck, switchMap } from 'rxjs/operators';

import { CategoryDetailBaseComponent } from './category-detail-base.component';
import { CategoryDetailDataService } from './category-detail-data.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss'],
  animations: [fadeIn]
})
export class CategoryDetailEditComponent extends CategoryDetailBaseComponent implements OnInit {

  constructor(
      protected location: Location,
      protected router: Router,
      protected service: CategoryDetailDataService,
      protected globalNotificationService: GlobalNotificationService,
      protected route: ActivatedRoute
  ) {
    super(location, router, service, globalNotificationService, route);
    this.pageTitle = 'Edit Category';
  }

  get name() {
    return this.categoryForm.get('name');
  }

  ngOnInit() {
    this.categoryForm.addControl('id', new FormControl(null));

    this.subscriptions.push(
        this.route.params
            .pipe(
                pluck('id'),
                switchMap((id: number) => this.service.getCategory(id))
            )
            .subscribe((category: Category) => {
              this.initialName = category.name;
              this.categoryForm.setValue(category);
            })
    );
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.nameExists || this.categoryForm.invalid) {
      return;
    }

    this.service.updateCategory(this.categoryForm.value)
        .subscribe(() => {
          this.router.navigate([RoutePaths.CATEGORY_LISTING]);
          this.globalNotificationService.add(MESSAGES.CATEGORY.UPDATE);
        });
  }
}

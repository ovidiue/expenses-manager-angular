import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutePaths } from '@models/enums/route-paths';
import { fadeIn } from '@utils/animations/fadeIn';

import { TagDetailBase } from './tag-detail-base';
import { TagDetailDataService } from './tag-detail-data.service';

@Component({
  selector: 'app-tag-detail',
  templateUrl: './tag-detail.component.html',
  styleUrls: ['./tag-detail.component.scss'],
  animations: [fadeIn]
})
export class TagDetailAddComponent extends TagDetailBase {
  nameExists = false;
  tagFormControls: FormGroup;

  constructor(
      protected location: Location,
      protected router: Router,
      protected service: TagDetailDataService,
      protected route: ActivatedRoute
  ) {
    super(location, router, service, route);
    this.pageTitle = 'Add Rate';
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.tagFormControls.invalid || this.nameExists) {
      return;
    }
    this.service
      .saveTag(this.tagFormControls.value)
      .subscribe(
        () => {
          this.router.navigate([RoutePaths.TAG_LISTING]);
        });
  }

}

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { TagDetailDataService } from './tag-detail-data.service';
import { FormGroup } from '@angular/forms';
import { fadeIn } from '@utils/animations/fadeIn';
import { RoutePaths } from '@models/enums/route-paths';
import { TagDetailBase } from './tag-detail-base';

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

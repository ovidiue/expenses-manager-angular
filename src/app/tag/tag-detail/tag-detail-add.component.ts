import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutePaths } from '@models/enums/route-paths.enum';
import { fadeIn } from '@utils/animations/fadeIn';

import { TagDataService } from '../tag-data.service';

import { TagDetailBase } from './tag-detail-base';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-tag-detail',
  templateUrl: './tag-detail.component.html',
  styleUrls: ['./tag-detail.component.scss'],
  animations: [fadeIn],
})
export class TagDetailAddComponent extends TagDetailBase {
  nameExists = false;

  constructor(
    protected location: Location,
    protected router: Router,
    protected service: TagDataService,
    protected route: ActivatedRoute
  ) {
    super(location, service);
    this.pageTitle = 'Add Tag';
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.tagFormControls.invalid || this.nameExists) {
      return;
    }
    this.service
      .saveTag(this.tagFormControls.value)
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => {
        this.router.navigate([RoutePaths.TAG_LISTING]);
      });
  }
}

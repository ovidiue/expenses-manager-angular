import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { takeUntil } from 'rxjs/operators';

import { RoutePaths } from '@models/enums/route-paths.enum';

import { fadeIn } from '@utils/animations';

import { TagFacade } from '../tag.facade';
import { TagDetailBaseComponent } from './tag-detail-base.component';

import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-tag-detail',
  templateUrl: './tag-detail.component.html',
  styleUrls: ['./tag-detail.component.scss'],
  animations: [fadeIn],
})
export class TagDetailAddComponent extends TagDetailBaseComponent {
  nameExists = false;

  constructor(
    protected location: Location,
    protected router: Router,
    protected tagFacade: TagFacade,
    protected route: ActivatedRoute,
    private readonly _translocoService: TranslocoService
  ) {
    super(location, tagFacade);
    this.pageTitle = this._translocoService.translate('TAG.DETAIL.ADD');
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.tagFormControls.invalid || this.nameExists) {
      return;
    }
    this.tagFacade
      .saveTag(this.tagFormControls.value)
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => {
        this.router.navigate([RoutePaths.TAG_LISTING]);
      });
  }
}

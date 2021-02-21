import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutePaths } from '@models/enums/route-paths.enum';
import { Tag } from '@models/interfaces';
import { fadeIn } from '@utils/animations/fadeIn';
import { pluck, switchMap, takeUntil } from 'rxjs/operators';

import { TagFacade } from '../tag.facade';

import { TagDetailBase } from './tag-detail-base';

@Component({
  selector: 'app-tag-detail',
  templateUrl: './tag-detail.component.html',
  styleUrls: ['./tag-detail.component.scss'],
  animations: [fadeIn],
})
export class TagDetailEditComponent extends TagDetailBase implements OnInit {
  nameExists = false;

  constructor(
    protected location: Location,
    protected router: Router,
    protected tagFacade: TagFacade,
    protected route: ActivatedRoute
  ) {
    super(location, tagFacade);

    this.pageTitle = 'Edit Rate';
  }

  ngOnInit(): void {
    this.tagFormControls.addControl('id', new FormControl(null));
    this.route.params
      .pipe(
        takeUntil(this._destroy$),
        pluck('id'),
        switchMap((id: number) => this.tagFacade.getTag(id))
      )
      .subscribe((tag: Tag) => {
        this.tagFormControls.setValue(tag);
        this.initialName = tag.name;
      });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.tagFormControls.invalid || this.nameExists) {
      return;
    }
    this.tagFacade.update(this.tagFormControls.value).subscribe(() => {
      this.router.navigate([RoutePaths.TAG_LISTING]);
    });
  }
}

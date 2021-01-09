import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutePaths } from '@models/enums/route-paths.enum';
import { Tag } from '@models/interfaces';
import { fadeIn } from '@utils/animations/fadeIn';
import { pluck, switchMap, takeUntil } from 'rxjs/operators';

import { TagDataService } from '../tag-data.service';

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
    protected service: TagDataService,
    protected route: ActivatedRoute
  ) {
    super(location, service);

    this.pageTitle = 'Edit Rate';
  }

  ngOnInit(): void {
    this.tagFormControls.addControl('id', new FormControl(null));
    this.route.params
      .pipe(
        takeUntil(this._destroy$),
        pluck('id'),
        switchMap((id: number) => this.service.getTag(id))
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
    this.service.update(this.tagFormControls.value).subscribe(() => {
      this.router.navigate([RoutePaths.TAG_LISTING]);
    });
  }
}

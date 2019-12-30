import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { TagDetailDataService } from './tag-detail-data.service';
import { FormControl, FormGroup } from '@angular/forms';
import { fadeIn } from '@utils/animations/fadeIn';
import { RoutePaths } from '@models/enums/route-paths';
import { TagDetailBase } from './tag-detail-base';
import { pluck, switchMap } from 'rxjs/operators';
import { Tag } from '@models/tag';

@Component({
  selector: 'app-tag-detail',
  templateUrl: './tag-detail.component.html',
  styleUrls: ['./tag-detail.component.scss'],
  animations: [fadeIn]
})
export class TagDetailEditComponent extends TagDetailBase implements OnInit {
  nameExists = false;
  tagFormControls: FormGroup;

  constructor(
      protected location: Location,
      protected router: Router,
      protected service: TagDetailDataService,
      protected route: ActivatedRoute
  ) {
    super(location, router, service, route);

    this.pageTitle = 'Edit Rate';
  }

  ngOnInit(): void {
    this.tagFormControls.addControl('id', new FormControl(null));
    this.subscriptions.push(
        this.route.params
            .pipe(
                pluck('id'),
                switchMap((id: number) => this.service.getTag(id))
            )
            .subscribe((tag: Tag) => {
              this.tagFormControls.setValue(tag);
              this.initialName = tag.name;
            })
    );
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.tagFormControls.invalid || this.nameExists) {
      return;
    }
    this.service
      .update(this.tagFormControls.value)
      .subscribe(
        () => {
          this.router.navigate([RoutePaths.TAG_LISTING]);
        });
  }

}

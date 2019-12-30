import { SubscriptionsBaseClass } from '@models/subscriptions-base.class';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TagDetailDataService } from './tag-detail-data.service';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { Tag } from '@models/tag';

export class TagDetailBase extends SubscriptionsBaseClass {
  pageTitle: string;
  nameExists: boolean;
  tagFormControls: FormGroup;
  initialName: string;
  protected isSubmitted = false;

  constructor(
      protected location: Location,
      protected router: Router,
      protected service: TagDetailDataService,
      protected route: ActivatedRoute
  ) {
    super();
    this.tagFormControls = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
      color: new FormControl('lightgray')
    });

    this.name.valueChanges
        .pipe(
            debounceTime(300),
            distinctUntilChanged(),
            filter((value: string) => value.length > 0),
            switchMap((value: string) => this.service.getTagByName(value)),
        )
        .subscribe((tag: Tag | null) => {
          if (this.initialName) {
            this.nameExists = !!tag && this.initialName !== tag.name;
          } else {
            this.nameExists = !!tag;
          }
        });
  }

  get name() {
    return this.tagFormControls.get('name');
  }

  goBack(event: any) {
    event.preventDefault();
    this.location.back();
  }

}

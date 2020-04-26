import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Tag } from '@models/interfaces';
import { SubscriptionsBaseClass } from '@models/subscriptions-base.class';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';

import { TagDataService } from '../tag-data.service';

export class TagDetailBase extends SubscriptionsBaseClass {
  pageTitle: string;
  nameExists: boolean;
  tagFormControls: FormGroup;
  initialName: string;
  protected isSubmitted = false;
  private spinnerMessage$ = this.service.getLoadingMessage();
  private loading$ = this.service.getLoadingState();

  constructor(protected location: Location, protected service: TagDataService) {
    super();
    this.tagFormControls = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
      color: new FormControl('lightgray'),
    });

    this.name.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        filter((value: string) => value.length > 0),
        switchMap((value: string) => this.service.getTagByName(value))
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

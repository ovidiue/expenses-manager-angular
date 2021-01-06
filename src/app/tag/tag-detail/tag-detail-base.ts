import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Tag } from '@models/interfaces';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  takeUntil,
} from 'rxjs/operators';

import { TagDataService } from '../tag-data.service';
import { Subject } from 'rxjs';
import { OnDestroy } from '@angular/core';

export class TagDetailBase implements OnDestroy {
  pageTitle: string;
  nameExists: boolean;
  tagFormControls: FormGroup;
  initialName: string;
  protected isSubmitted = false;
  protected _destroy$ = new Subject();
  private spinnerMessage$ = this.service.getLoadingMessage();
  private loading$ = this.service.getLoadingState();

  constructor(protected location: Location, protected service: TagDataService) {
    this.tagFormControls = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
      color: new FormControl('lightgray'),
    });

    this.name.valueChanges
      .pipe(
        takeUntil(this._destroy$),
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

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  goBack(event: any) {
    event.preventDefault();
    this.location.back();
  }
}

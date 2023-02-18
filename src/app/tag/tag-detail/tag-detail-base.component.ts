import { Location } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

import { Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  takeUntil,
} from 'rxjs/operators';

import { Tag } from '@models/interfaces';

import { TagFacade } from '../tag.facade';

@Component({
  selector: 'app-tag-detail-base',
  template: '',
})
export class TagDetailBaseComponent implements OnDestroy {
  pageTitle = '';
  nameExists = false;
  tagFormControls: UntypedFormGroup;
  initialName = '';
  isSubmitted = false;
  loading$ = this.tagFacade.loading$;
  protected _destroy$ = new Subject<void>();

  constructor(protected location: Location, protected tagFacade: TagFacade) {
    this.tagFormControls = new UntypedFormGroup({
      name: new UntypedFormControl('', Validators.required),
      description: new UntypedFormControl(''),
      color: new UntypedFormControl('lightgray'),
    });

    this.name.valueChanges
      .pipe(
        takeUntil(this._destroy$),
        debounceTime(300),
        distinctUntilChanged(),
        filter((value: string) => value.length > 0),
        switchMap((value: string) => this.tagFacade.getTagByName(value))
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

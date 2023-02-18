import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CategoryFacade } from '../category.facade';

@Component({
  selector: 'app-category-detail-base',
  template: '',
})
export class CategoryDetailBaseComponent implements OnInit, OnDestroy {
  loading$ = this.categoryFacade.loading$;
  spinnerMessage$ = this.categoryFacade.loadingMsg$;
  pageTitle: string;
  nameExists = false;
  categoryForm: UntypedFormGroup;
  isSubmitted: boolean;
  protected initialName: string;
  protected _destroy$ = new Subject<void>();

  constructor(
    protected location: Location,
    protected categoryFacade: CategoryFacade
  ) {
    this.categoryForm = new UntypedFormGroup({
      name: new UntypedFormControl('', Validators.required),
      description: new UntypedFormControl(''),
      color: new UntypedFormControl('#B0AEB0'),
    });
  }

  get name() {
    return this.categoryForm.get('name');
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  ngOnInit() {
    this.categoryForm.valueChanges
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => (this.isSubmitted = false));
  }

  checkName($event): void {
    const name = $event.target.value;
    this.categoryFacade
      .getCategoryByName(name)
      .pipe(takeUntil(this._destroy$))
      .subscribe((resp) => {
        if (this.initialName) {
          this.nameExists = name !== this.initialName && !!resp;
        } else {
          this.nameExists = !!resp;
        }
      });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  goBack(event: any) {
    event.preventDefault();
    this.location.back();
  }
}

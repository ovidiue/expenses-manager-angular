import { Location } from '@angular/common';
import { Directive, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { CategoryFacade } from '../category.facade';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive()
export class CategoryDetailBaseComponent implements OnInit, OnDestroy {
  loading$ = this.categoryFacade.loading$;
  spinnerMessage$ = this.categoryFacade.loadingMsg$;
  pageTitle: string;
  nameExists = false;
  categoryForm: FormGroup;
  isSubmitted: boolean;
  protected initialName: string;
  protected _destroy$ = new Subject();

  constructor(
    protected location: Location,
    protected categoryFacade: CategoryFacade
  ) {
    this.categoryForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
      color: new FormControl('#B0AEB0'),
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

  goBack(event: any) {
    event.preventDefault();
    this.location.back();
  }
}

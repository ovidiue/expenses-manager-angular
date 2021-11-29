import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { pluck, switchMap, takeUntil } from 'rxjs/operators';

import { RoutePaths } from '@models/enums/route-paths.enum';
import { Category } from '@models/interfaces';

import { fadeIn } from '@utils/animations';

import { CategoryFacade } from '../category.facade';
import { CategoryDetailBaseComponent } from './category-detail-base.component';

import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss'],
  animations: [fadeIn],
})
export class CategoryDetailEditComponent
  extends CategoryDetailBaseComponent
  implements OnInit
{
  constructor(
    protected location: Location,
    protected router: Router,
    protected categoryFacade: CategoryFacade,
    protected route: ActivatedRoute,
    private readonly _translocoService: TranslocoService
  ) {
    super(location, categoryFacade);
    this.pageTitle = this._translocoService.translate('CATEGORY.DETAIL.EDIT');
  }

  get name() {
    return this.categoryForm.get('name');
  }

  ngOnInit() {
    this.categoryForm.addControl('id', new FormControl(null));

    this.route.params
      .pipe(
        takeUntil(this._destroy$),
        pluck('id'),
        switchMap((id: number) => this.categoryFacade.getCategory(id))
      )
      .subscribe((category: Category) => {
        this.initialName = category.name;
        this.categoryForm.setValue(category);
      });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.nameExists || this.categoryForm.invalid) {
      return;
    }

    this.categoryFacade
      .updateCategory(this.categoryForm.value)
      .subscribe(() => {
        this.router.navigate([RoutePaths.CATEGORY_LISTING]);
      });
  }
}

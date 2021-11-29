import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Category } from '@models/interfaces';

import { fadeIn } from '@utils/animations';
import { TABLE_DEFAULTS } from '@utils/table-options';

import { CategoryFacade } from '../category.facade';

import { TranslocoService } from '@ngneat/transloco';
import { OverlayService } from '@shared/modal/overlay.service';

export class TagDataSource extends DataSource<Category> {
  /** Stream of data that is provided to the table. */
  data = this.categoryFacade.categories$;
  constructor(private readonly categoryFacade: CategoryFacade) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Category[]> {
    return this.data;
  }

  disconnect() {}
}

@Component({
  selector: 'app-categories',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss'],
  animations: [fadeIn],
})
export class CategoriesListComponent implements OnInit {
  tableColumns: string[] = ['name', 'description', 'color', 'actions'];
  dataSource = new TagDataSource(this._categoryFacade);

  loading$ = this._categoryFacade.loading$;

  constructor(
    private readonly _categoryFacade: CategoryFacade,
    private readonly _overlayService: OverlayService,
    private readonly _translocoService: TranslocoService
  ) {
    this._categoryFacade.getCategories(null);
  }

  ngOnInit() {
    this.getCategories(TABLE_DEFAULTS.query);
  }

  getCategories(event: any): void {
    this._categoryFacade.getCategories(event);
  }

  showDeleteDialog(category: Category) {
    const text = this._translocoService.translate('CATEGORY.LIST.DELETE', {
      categoryName: category.name,
    });
    const overlayRef = this._overlayService.open(text, null);
    overlayRef.afterClosed$.subscribe((res) => {
      if (res.data) {
        this._categoryFacade
          .deleteCategory([category.id], false)
          .subscribe(() => {
            this._categoryFacade.getCategories(null);
          });
      }
    });
  }
}

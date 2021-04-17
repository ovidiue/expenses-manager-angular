import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { LazyLoadEvent } from 'primeng/api';

import { Category } from '@models/interfaces';

import { fadeIn } from '@utils/animations/fadeIn';
import { TABLE_DEFAULTS } from '@utils/table-options';

import { CategoryFacade } from '../category.facade';

import { OverlayService } from '@shared/modal/overlay.service';

export class TagDataSource extends DataSource<Category> {
  constructor(private readonly categoryFacade: CategoryFacade) {
    super();
  }
  /** Stream of data that is provided to the table. */
  data = this.categoryFacade.categories$;

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
  dataSource = new TagDataSource(this.categoryFacade);

  loading$ = this.categoryFacade.loading$;

  constructor(
    private categoryFacade: CategoryFacade,
    private readonly overlayService: OverlayService
  ) {
    this.categoryFacade.getCategories(null);
  }

  ngOnInit() {
    this.getCategories(TABLE_DEFAULTS.query);
  }

  getCategories(event: LazyLoadEvent): void {
    this.categoryFacade.getCategories(event);
  }

  showDeleteDialog(category: Category) {
    const overlayRef = this.overlayService.open(
      `<h2>Delete</h2><p>Are you sure you want to delete category <b>${category.name}</b>?</p>`,
      null
    );
    overlayRef.afterClosed$.subscribe((res) => {
      if (res.data) {
        this.categoryFacade
          .deleteCategory([category.id], false)
          .subscribe(() => {
            this.categoryFacade.getCategories(null);
          });
      }
    });
  }
}

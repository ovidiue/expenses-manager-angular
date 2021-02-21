import { Component, OnInit } from '@angular/core';
import { Category } from '@models/interfaces';
import { fadeIn } from '@utils/animations/fadeIn';
import { TABLE_DEFAULTS } from '@utils/table-options';
import { ConfirmationService, LazyLoadEvent, MessageService, } from 'primeng/api';

import { CategoryFacade } from '../category.facade';

@Component({
  selector: 'app-categories',
  templateUrl: './category-list.component.html',
  styleUrls: ['./categories.component.scss'],
  providers: [ConfirmationService, MessageService, CategoryFacade],
  animations: [fadeIn],
})
export class CategoryListComponent implements OnInit {
  categories$ = this.categoryFacade.categories$;
  total$ = this.categoryFacade.total$;
  loading$ = this.categoryFacade.loading$;

  selectedCategories: Category[] = [];

  selectedDescription = '';
  displayDeleteModal = false;
  deletionText = '';
  selectedForDeletion: Category;

  tableDefaults = TABLE_DEFAULTS;

  tableOptions = {
    columns: [
      { name: 'Name', value: 'name' },
      { name: 'Description', value: 'description' },
      { name: 'Color', value: 'color' },
    ],
  };

  constructor(private categoryFacade: CategoryFacade) {
    this.categoryFacade.getCategories(null);
  }

  ngOnInit() {
    this.tableDefaults.loading = true;
    this.getCategories(TABLE_DEFAULTS.query);
  }

  resetDeletionVariables(): void {
    this.displayDeleteModal = false;
    this.deletionText = '';
    this.selectedForDeletion = null;
    this.selectedCategories = [];
  }

  deleteCategory(withExpenses: boolean): void {
    const idsToDelete = this.selectedForDeletion
      ? [this.selectedForDeletion.id]
      : this.selectedCategories.map((cat) => cat.id);
    this.categoryFacade
      .deleteCategory(idsToDelete, withExpenses)
      .subscribe((deleted) => {
        this.resetDeletionVariables();
      });
  }

  getCategories(event: LazyLoadEvent): void {
    this.tableDefaults.loading = true;
    this.categoryFacade.getCategories(event);
  }
}

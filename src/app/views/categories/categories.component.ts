import { Component, OnInit } from '@angular/core';
import { Category } from '@models/category';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { fadeIn } from '@utils/animations/fadeIn';
import { TABLE_DEFAULTS } from '@utils/table-options';
import { CategoriesDataService } from './categories-data.service';
import { Observable } from 'rxjs';
import { GlobalNotificationService } from '@services/global-notification.service';
import { MESSAGES } from '@utils/messages';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  providers: [ConfirmationService, MessageService, CategoriesDataService],
  animations: [fadeIn]
})
export class CategoriesComponent implements OnInit {

  categories$: Observable<Category[]>;
  total$: Observable<number>;

  selectedCategories: Category[] = [];

  selectedDescription = '';
  displayDeleteModal = false;
  deletionText = '';
  selectedForDeletion: Category;

  tableDefaults = TABLE_DEFAULTS;

  tableOptions = {
    columns: [
      {name: 'Name', value: 'name'},
      {name: 'Description', value: 'description'},
      {name: 'Color', value: 'color'}
    ]
  };

  constructor(
      private service: CategoriesDataService,
      private globalNotificationService: GlobalNotificationService
  ) {
    this.categories$ = this.service.getCategories(TABLE_DEFAULTS.query);
    this.total$ = this.service.getTotal();
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
    const idsToDelete = this.selectedForDeletion ? [this.selectedForDeletion.id] : this.selectedCategories
    .map(cat => cat.id);
    this.service.deleteCategory(idsToDelete, withExpenses).subscribe((deleted) => {
      this.resetDeletionVariables();
      this.globalNotificationService.add(MESSAGES.CATEGORY.DELETED_MULTIPLE + ' ' + deleted);
    });
  }

  getCategories(event: LazyLoadEvent): void {
    this.tableDefaults.loading = true;
    this.service.getCategories(event)
    .subscribe(() => this.tableDefaults.loading = false);
  }
}

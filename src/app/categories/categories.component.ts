import {Component, OnInit} from '@angular/core';
import {Category} from '../classes/category';
import {CategoryService} from '../services/category-service.service';
import {ConfirmationService, LazyLoadEvent, MessageService} from 'primeng/api';
import {GlobalNotificationService} from '../services/global-notification.service';
import {fadeIn} from '../utils/animations/fadeIn';
import {MESSAGES} from '../utils/messages';
import {TABLE_DEFAULTS} from '../utils/table-options';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  providers: [ConfirmationService, MessageService],
  animations: [fadeIn]
})
export class CategoriesComponent implements OnInit {

  categories: Category[] = [];
  selectedCategories: Category[] = [];

  selectedDescription = '';
  displayDeleteModal = false;
  deletionText = '';
  selectedForDeletion: Category;

  rowsPerPageOptions = TABLE_DEFAULTS.rowsPerPageOptions;
  totalTableRecords: number;
  loading = true;

  constructor(private categoryService: CategoryService,
              private globalNotificationService: GlobalNotificationService) {
  }

  ngOnInit() {
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
    console.log('withExpenses', withExpenses);
    this.categoryService.deleteCategories(idsToDelete, withExpenses)
    .then(() => {
      this.getCategories(TABLE_DEFAULTS.query);
      this.resetDeletionVariables();
      this.globalNotificationService.add(MESSAGES.deletedCategories);
    })
    .catch(() => {
      this.globalNotificationService.add(MESSAGES.error);
      this.resetDeletionVariables();
    });
  }

  getCategories(event: LazyLoadEvent): void {
    this.loading = true;
    this.categoryService.getCategories(event)
    .then(resp => {
      this.totalTableRecords = resp.totalElements;
      this.categories = resp.content;
      this.loading = false;
    });
  }


}

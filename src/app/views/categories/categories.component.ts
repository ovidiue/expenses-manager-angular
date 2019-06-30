import {Component, OnInit} from '@angular/core';
import {Category} from '../../models/category';
import {ConfirmationService, LazyLoadEvent, MessageService} from 'primeng/api';
import {GlobalNotificationService} from '../../services/global-notification.service';
import {fadeIn} from '../../utils/animations/fadeIn';
import {MESSAGES} from '../../utils/messages';
import {TABLE_DEFAULTS} from '../../utils/table-options';
import {CategoriesDataService} from './categories-data.service';

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

  tableDefaults = TABLE_DEFAULTS;

  tableOptions = {
    totalTableRecords: 0,
    columns: [
      {name: 'Name', value: 'name'},
      {name: 'Description', value: 'description'},
      {name: 'Color', value: 'color'}
    ]
  };

  constructor(
    private service: CategoriesDataService,
    private globalNotificationService: GlobalNotificationService) {
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
    this.service.deleteCategory(idsToDelete, withExpenses)
    .subscribe(
      () => {
        this.getCategories(TABLE_DEFAULTS.query);
        this.globalNotificationService.add(MESSAGES.deletedCategories);
      },
      () => this.globalNotificationService.add(MESSAGES.error),
      () => this.resetDeletionVariables());
  }

  getCategories(event: LazyLoadEvent): void {
    this.tableDefaults.loading = true;
    this.service.getAllCategories(event).subscribe(resp => {
      this.categories = resp.content;
      this.tableOptions.totalTableRecords = resp.totalElements;
      this.tableDefaults.loading = false;
    });
  }
}

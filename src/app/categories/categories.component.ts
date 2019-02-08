import {Component, OnInit} from '@angular/core';
import {Category} from '../classes/category';
import {CategoryService} from '../services/category-service.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {GlobalNotificationService} from '../services/global-notification.service';
import {fadeIn} from '../utils/animations/fadeIn';
import {MESSAGES} from '../utils/messages';

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

  constructor(private categoryService: CategoryService,
              private globalNotificationService: GlobalNotificationService) {
  }

  ngOnInit() {
    this.getCategories();
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
      this.getCategories();
      this.resetDeletionVariables();
      this.globalNotificationService.add(MESSAGES.deletedCategories);
    })
    .catch(() => {
      this.globalNotificationService.add(MESSAGES.error);
      this.resetDeletionVariables();
    });
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(categories => {
      console.log('categories: ', categories);
      this.categories = categories;
    });
  }


}

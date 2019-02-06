import {Component, OnInit} from '@angular/core';
import {Category} from '../classes/category';
import {CategoryService} from '../services/category-service.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {GlobalNotificationService} from '../services/global-notification.service';
import {MESSAGES} from '../utils/messages';
import {fadeIn} from '../utils/animations/fadeIn';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  providers: [ConfirmationService, MessageService],
  animations: [fadeIn]
})
export class CategoriesComponent implements OnInit {

  categories: Category[] = [];
  selectedCat: Category[] = [];

  selectedDescription = '';

  constructor(private categoryService: CategoryService,
              private globalNotificationService: GlobalNotificationService,
              private confirmationService: ConfirmationService) {
  }

  ngOnInit() {
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(categories => {
      console.log('categories: ', categories);
      this.categories = categories;
    });
  }

  confirmDeletion() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete these categories?',
      accept: () => {
        const ids = this.selectedCat.map(el => el.id);
        console.log('ids to delete', ids);
        this.categoryService.deleteCategories(ids)
        .then(() => {
          ids.forEach(id => {
            const index = this.categories.findIndex(cat => cat.id === id);
            this.categories.splice(index, 1);
          });
          this.globalNotificationService.add(MESSAGES.deletedCategories);
        })
        .catch(err => this.globalNotificationService.add(MESSAGES.error));
      }
    });
  }

  onDelete(cat: Category): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${cat.name} ?`,
      accept: () => {
        this.categoryService.deleteCategories([cat.id])
        .then(() => {
          this.categories = this.categories.filter(el => el.id !== cat.id);
          this.globalNotificationService.add(MESSAGES.deletedCategories);
        }).catch(() => this.globalNotificationService.add(MESSAGES.error));
      }
    });
  }

}

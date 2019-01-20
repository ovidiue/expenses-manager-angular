import {Component, OnInit} from '@angular/core';
import {Category} from '../classes/category';
import {CategoryServiceService} from '../category-service.service';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  providers: [ConfirmationService]
})
export class CategoriesComponent implements OnInit {

  categories: Category[] = [];
  selectedCat: Category[] = [];

  constructor(private categoryService: CategoryServiceService,
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
        .then(resp => {
          ids.forEach(id => {
            const index = this.categories.findIndex(cat => cat.id === id);
            this.categories.splice(index, 1);
          });
        })
        .catch(err => alert('something went wrong' + err));
      }
    });
  }

}

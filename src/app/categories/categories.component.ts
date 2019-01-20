import {Component, OnInit} from '@angular/core';
import {Category} from '../classes/category';
import {CategoryServiceService} from '../category-service.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories: Category[] = [];

  constructor(private categoryService: CategoryServiceService) {
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

  handleClick(){
    console.log('clicked: ');
  }

}

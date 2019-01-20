import {Component, OnInit} from '@angular/core';
import {Category} from '../classes/category';
import {CategoryServiceService} from '../category-service.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.sass']
})
export class CategoriesComponent implements OnInit {
  dtOptions: DataTables.Settings = {};

  settings = {
    columns: {
      id: {
        title: 'ID'
      },
      name: {
        title: 'Name'
      },
      username: {
        title: 'Color'
      },
      email: {
        title: 'Description'
      }
    }
  };

  categories: Category[] = [];

  constructor(private categoryService: CategoryServiceService) {
  }

  ngOnInit() {
    this.dtOptions = {
      data: [],
      columns: [{
        title: 'ID',
        data: 'id'
      }, {
        title: 'Name',
        data: 'name'
      }, {
        title: 'Description',
        data: 'description'
      }, {
        title: 'Color',
        data: 'color'
      }, {
        title: 'Action',
        render: function (data: any, type: any, full: any) {
          return 'View';
        }
      }]
    };

    this.getCategories();

  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(categories => {
      console.log('categories: ', categories);
      this.categories = categories;
      this.dtOptions.data = this.categories;
    });
  }

}

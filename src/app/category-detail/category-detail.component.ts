import {Component, OnInit} from '@angular/core';
import {Category} from '../classes/category';
import {Location} from '@angular/common';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent implements OnInit {
  pageTitle: string = this.determineTitle();
  category: Category;

  constructor(private location: Location) {
  }

  ngOnInit() {
  }

  determineTitle(): string {
    return 'Add Category';
  }

  goBack() {
    this.location.back();
  }
}

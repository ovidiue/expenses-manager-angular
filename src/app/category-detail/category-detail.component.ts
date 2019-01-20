import {Component, OnInit} from '@angular/core';
import {Category} from '../classes/category';
import {Location} from '@angular/common';
import {CategoryServiceService} from '../category-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent implements OnInit {
  pageTitle: string = this.determineTitle();
  category = new Category();

  constructor(private location: Location, private router: Router, private categoryService: CategoryServiceService) {
  }

  ngOnInit() {
  }

  determineTitle(): string {
    return 'Add Category';
  }

  goBack() {
    this.location.back();
  }

  onSubmit() {
    console.log(this.category);
    this.categoryService.saveCategory(this.category);
    this.router.navigate(['/categories']);
  }
}

import {Component, OnInit} from '@angular/core';
import {Category} from '../classes/category';
import {Location} from '@angular/common';
import {CategoryService} from '../category-service.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent implements OnInit {
  pageTitle: string = this.determineTitle();
  category = new Category();
  id: number;

  constructor(private location: Location,
              private router: Router,
              private categoryService: CategoryService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.id = <any>this.route.snapshot.paramMap.get('id');
    this.pageTitle = this.determineTitle();
    console.log('id', this.id);
    this.categoryService.getCategory(this.id).then(cat => this.category = cat).catch(err => console.error(err));
  }

  determineTitle(): string {
    if (this.id) {
      return 'Edit Category';
    } else {
      return 'Add Category';
    }
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

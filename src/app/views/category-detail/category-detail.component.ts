import {Component, OnInit} from '@angular/core';
import {Category} from '../../models/category';
import {Location} from '@angular/common';
import {CategoryService} from '../../services/category-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {GlobalNotificationService} from '../../services/global-notification.service';
import {MESSAGES} from '../../utils/messages';
import {fadeIn} from '../../utils/animations/fadeIn';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss'],
  animations: [fadeIn]
})
export class CategoryDetailComponent implements OnInit {
  pageTitle: string = this.determineTitle();
  nameExists = false;
  category = new Category();
  id: number;

  constructor(private location: Location,
              private router: Router,
              private categoryService: CategoryService,
              private globalNotificationService: GlobalNotificationService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.id = <any>this.route.snapshot.paramMap.get('id');
    this.pageTitle = this.determineTitle();
    this.categoryService.getCategory(this.id).then(cat => this.category = cat).catch(err => console.error(err));
  }

  isEdit(): boolean {
    return this.id !== null;
  }

  determineTitle(): string {
    if (this.id) {
      return 'Edit Category';
    } else {
      return 'Add Category';
    }
  }

  checkName($event): void {
    const name = $event.target.value;
    this.categoryService.getCategoryByName(name)
    .then(resp => {
      if (resp) {
        this.nameExists = true;
      } else {
        this.nameExists = false;
      }
    });
  }

  goBack(event: any) {
    event.preventDefault();
    this.location.back();
  }

  onSubmit() {
    this.isEdit()
      ?
      this.categoryService.updateCategory(this.category, this.id)
      .then(() => {
        this.router.navigate(['/categories']);
        this.globalNotificationService.add(MESSAGES.addCategory);
      }).catch(() => this.globalNotificationService.add(MESSAGES.error))
      :
      this.categoryService.saveCategory(this.category)
      .then(() => {
        this.router.navigate(['/categories']);
        this.globalNotificationService.add(MESSAGES.addCategory);
      }).catch(() => this.globalNotificationService.add(MESSAGES.error));
  }
}

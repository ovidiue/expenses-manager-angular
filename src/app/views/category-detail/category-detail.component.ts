import {Component, OnDestroy, OnInit} from '@angular/core';
import {Category} from '../../models/category';
import {Location} from '@angular/common';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {GlobalNotificationService} from '../../services/global-notification.service';
import {MESSAGES} from '../../utils/messages';
import {fadeIn} from '../../utils/animations/fadeIn';
import {CategoryDetailDataService} from './category-detail-data.service';
import {Observable, Subscription} from 'rxjs';
import {flatMap} from 'rxjs/operators';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RoutePaths} from '../../models/interfaces';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss'],
  animations: [fadeIn]
})
export class CategoryDetailComponent implements OnInit, OnDestroy {

  protected pageTitle: string;
  protected nameExists = false;
  protected categoryForm: FormGroup;
  private isEdit: boolean;
  private id: number;
  private paramSubscription: Subscription;
  private formSubscription: Subscription;
  private isSubmitted: boolean;

  constructor(
    private location: Location,
    private router: Router,
    private service: CategoryDetailDataService,
    private globalNotificationService: GlobalNotificationService,
    private route: ActivatedRoute
  ) {
    this.categoryForm = new FormGroup({
      name        : new FormControl('', Validators.required),
      description : new FormControl(''),
      color       : new FormControl('#B0AEB0'),
      id          : new FormControl(null)
    });
  }

  get name() {
    return this.categoryForm.get('name');
  }

  ngOnInit() {
    this.paramSubscription = this.route.params
    .pipe(
      flatMap((params: Params) => {
        this.id = params && params.id || null;
        this.pageTitle = this.id ? 'Edit Category' : 'Add Category';
        this.isEdit = !!(params && params.id);
        return params.id || new Observable();
      }),
      flatMap(id => id ? this.service.getCategory(parseInt(id.toString(), 10)) : new Observable())
    )
    .subscribe((category: Category) => this.categoryForm.setValue(category));

    this.formSubscription = this.categoryForm.valueChanges
    .subscribe(() => this.isSubmitted = false);
  }

  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe();
  }

  checkName($event): void {
    const name = $event.target.value;
    this.service.getCategoryByName(name)
    .subscribe(resp => this.nameExists = !!resp);
  }

  goBack(event: any) {
    event.preventDefault();
    this.location.back();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.nameExists || this.categoryForm.invalid) {
      return;
    }

    // TODO fix confirm message
    const confirmMessage = this.isEdit ? MESSAGES.CATEGORY.UPDATE : MESSAGES.CATEGORY.ADD;
    this.service.saveCategory(this.categoryForm.value)
    .subscribe(() => {
      this.router.navigate([RoutePaths.CATEGORY_LISTING]);
      this.globalNotificationService.add(confirmMessage);
    });
  }
}

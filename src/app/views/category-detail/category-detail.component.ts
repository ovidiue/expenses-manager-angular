import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { BehaviorSubject, Subscription } from 'rxjs';
import { filter, flatMap } from 'rxjs/operators';
import { CategoryDetailDataService } from './category-detail-data.service';
import { fadeIn } from '@utils/animations/fadeIn';
import { GlobalNotificationService } from '@services/global-notification.service';
import { MESSAGES } from '@utils/messages';
import { RoutePaths } from '@models/enums/route-paths';

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
  private id$: BehaviorSubject<number> = new BehaviorSubject<number>(null);
  private paramSubscription: Subscription;
  private formSubscription: Subscription;
  private idSubscription: Subscription;
  private isSubmitted: boolean;

  constructor(
      private location: Location,
      private router: Router,
      private service: CategoryDetailDataService,
      private globalNotificationService: GlobalNotificationService,
      private route: ActivatedRoute
  ) {
  }

  get name() {
    return this.categoryForm.get('name');
  }

  ngOnInit() {
    this.categoryForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
      color: new FormControl('#B0AEB0'),
      id: new FormControl(null)
    });

    this.idSubscription = this.id$
    .pipe(
        filter(id => id !== null),
        flatMap(id => this.service.getCategory(id))
    )
    .subscribe(category => this.categoryForm.setValue(category));

    this.paramSubscription = this.route.params.subscribe(params => {
      this.id$.next(params.id || null);
      this.isEdit = !!(params && params.id);
      this.pageTitle = params.id ? 'Edit Category' : 'Add Category';
    });

    this.formSubscription = this.categoryForm.valueChanges
    .subscribe(() => this.isSubmitted = false);
  }

  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe();
    this.idSubscription.unsubscribe();
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

    const confirmMessage = this.isEdit ? MESSAGES.CATEGORY.UPDATE : MESSAGES.CATEGORY.ADD;
    this.service.saveCategory(this.categoryForm.value)
    .subscribe(() => {
      this.router.navigate([RoutePaths.CATEGORY_LISTING]);
      this.globalNotificationService.add(confirmMessage);
    });
  }
}

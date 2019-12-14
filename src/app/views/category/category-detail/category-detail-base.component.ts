import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryDetailDataService } from './category-detail-data.service';
import { OnInit } from '@angular/core';
import { GlobalNotificationService } from '@services/global-notification.service';
import { SubscriptionsBaseClass } from '@models/subscriptions-base.class';
import { Location } from '@angular/common';

export class CategoryDetailBaseComponent extends SubscriptionsBaseClass implements OnInit {

  protected pageTitle: string;
  protected nameExists = false;
  protected categoryForm: FormGroup;
  protected isSubmitted: boolean;
  protected initialName: string;

  constructor(
      protected location: Location,
      protected router: Router,
      protected service: CategoryDetailDataService,
      protected globalNotificationService: GlobalNotificationService,
      protected route: ActivatedRoute
  ) {
    super();
    this.categoryForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
      color: new FormControl('#B0AEB0'),
    });
  }

  get name() {
    return this.categoryForm.get('name');
  }

  ngOnInit() {
    this.subscriptions.push(
        this.categoryForm.valueChanges
            .subscribe(() => this.isSubmitted = false)
    );
  }

  checkName($event): void {
    console.log('checkName', this.initialName);
    const name = $event.target.value;
    this.subscriptions.push(
        this.service
            .getCategoryByName(name)
            .subscribe(resp => {
              if (this.initialName) {
                this.nameExists = name !== this.initialName && !!resp;
              } else {
                this.nameExists = !!resp;
              }

            })
    );
  }

  goBack(event: any) {
    event.preventDefault();
    this.location.back();
  }
}

import { Location } from "@angular/common";
import { OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { SubscriptionsBaseClass } from "@models/subscriptions-base.class";

import { CategoryDataService } from "../category-data.service";

export class CategoryDetailBaseComponent extends SubscriptionsBaseClass implements OnInit {
  protected pageTitle: string;
  protected nameExists = false;
  protected categoryForm: FormGroup;
  protected isSubmitted: boolean;
  protected initialName: string;
  loading$ = this.service.getLoading();
  spinnerMessage$ = this.service.getLoadingMessage();

  constructor(protected location: Location, protected service: CategoryDataService) {
    super();
    this.categoryForm = new FormGroup({
      name: new FormControl("", Validators.required),
      description: new FormControl(""),
      color: new FormControl("#B0AEB0")
    });
  }

  get name() {
    return this.categoryForm.get('name');
  }

  ngOnInit() {
    this.subscriptions.push(
      this.categoryForm.valueChanges.subscribe(() => (this.isSubmitted = false))
    );
  }

  checkName($event): void {
    const name = $event.target.value;
    this.subscriptions.push(
      this.service.getCategoryByName(name).subscribe((resp) => {
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

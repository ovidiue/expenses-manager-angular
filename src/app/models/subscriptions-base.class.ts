import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

export class SubscriptionsBaseClass implements OnDestroy {
  protected subscriptions: Subscription[] = [];

  ngOnDestroy(): void {
    this.subscriptions.forEach((el: Subscription) => el.unsubscribe());
  }

}

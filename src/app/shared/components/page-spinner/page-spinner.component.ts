import { Component, Input } from '@angular/core';

import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-page-spinner',
  templateUrl: './page-spinner.component.html',
  styleUrls: ['./page-spinner.component.scss'],
})
export class PageSpinnerComponent {
  @Input() displaySpinner: boolean;
  @Input() message = 'Loading data ...';

  options: AnimationOptions = {
    path: 'assets/animations/loading.json',
  };
}

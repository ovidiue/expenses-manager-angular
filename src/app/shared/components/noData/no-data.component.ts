import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-no-data',
  templateUrl: 'no-data.component.html',
  styleUrls: ['no-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoDataComponent {
  @Input() message = '';

  options: AnimationOptions = {
    path: 'assets/animations/empty.json',
    loop: 1,
  };
}

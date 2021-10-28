import {
  Attribute,
  ChangeDetectionStrategy,
  Component,
  Input,
  Optional,
} from '@angular/core';

import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-no-data',
  templateUrl: 'no-data.component.html',
  styleUrls: ['no-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoDataComponent {
  @Input() message = '';

  constructor(@Optional() @Attribute('error') private error: boolean) {}

  private get path() {
    return this.error === null
      ? 'assets/animations/tumbleweed-rolling.json'
      : 'assets/animations/error.json';
  }

  options: AnimationOptions = {
    path: this.path,
    loop: 1,
  };
}

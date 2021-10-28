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
  private get path() {
    return this.error === null
      ? 'assets/animations/tumbleweed-rolling.json'
      : 'assets/animations/error.json';
  }
  @Input() message = '';

  options: AnimationOptions = {
    path: this.path,
    loop: 1,
  };

  constructor(@Optional() @Attribute('error') private error: boolean) {}
}

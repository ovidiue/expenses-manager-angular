import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'button[appButton], a[appButton]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'app-button',
    '[class.app-button--regular]': `bShape === 'regular'`,
    '[class.app-button--fab]': `bShape === 'fab'`,
    '[class.app-button--main]': `bType === 'main'`,
    '[class.app-button--secondary]': `bType === 'secondary'`,
    '[class.app-button--warning]': `bType === 'warning'`,
  },
})
export class ButtonComponent {
  @Input() bType: 'main' | 'secondary' | 'warning' = 'main';
  @Input() bShape: 'regular' | 'fab' = 'regular';
}

import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'button[appButton], a[appButton]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-button',
    '[class.app-button--main]': `bType === 'main'`,
    '[class.app-button--secondary]': `bType === 'secondary'`,
    '[class.app-button--warning]': `bType === 'warning'`,
  },
})
export class ButtonComponent {
  @Input() bType: 'main' | 'secondary' | 'warning' = 'main';
}

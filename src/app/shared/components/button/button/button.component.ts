import { Component, Input } from '@angular/core';

@Component({
  selector: '[appButton]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent  {

  @Input() text = '';
  @Input() bType: 'main' | 'secondary' | 'warning' = 'main';

}

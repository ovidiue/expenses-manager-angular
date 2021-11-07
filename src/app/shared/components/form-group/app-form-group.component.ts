import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-form-group',
  templateUrl: './app-form-group.component.html',
  styleUrls: ['./app-form-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    class: 'app-form-group',
  },
})
export class AppFormGroupComponent {}

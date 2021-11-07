import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-errors',
  templateUrl: 'errors.component.html',
  styleUrls: ['errors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorsComponent {
  @Input() text = '';
}

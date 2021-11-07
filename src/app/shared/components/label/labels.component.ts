import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-labels',
  templateUrl: 'labels.component.html',
  styleUrls: ['labels.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelsComponent {
  @Input() text = '';
}

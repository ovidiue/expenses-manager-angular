import {Component} from '@angular/core';
import {fadeIn} from '../../utils/animations/fadeIn';
import {TagDetailComponent} from './tag-detail.component';

@Component({
  selector: 'app-tag-detail-edit',
  templateUrl: 'tag-detail.component.html',
  styleUrls: ['tag-detail.component.scss'],
  animations: [fadeIn]
})
export class TagDetailEditComponent extends TagDetailComponent {

}

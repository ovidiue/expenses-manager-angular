import {Component, OnInit} from '@angular/core';
import {Tag} from '../../models/tag';
import {ConfirmationService, MessageService} from 'primeng/api';
import {GlobalNotificationService} from '../../services/global-notification.service';
import {fadeIn} from '../../utils/animations/fadeIn';
import {TABLE_DEFAULTS} from '../../utils/table-options';
import {TagsDataService} from './tags-data.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
  providers: [ConfirmationService, MessageService, TagsDataService],
  animations: [fadeIn]
})
export class TagsComponent implements OnInit {
  tags: Observable<any>;
  selectedTags: Tag[] = [];

  tableDefaults = TABLE_DEFAULTS;

  tableOptions = {
    totalTableRecords: 0,
    columns: [
      {name: 'Name', value: 'name'},
      {name: 'Description', value: 'description'},
      {name: 'Color', value: 'color'}
    ]
  };

  selectedDescription = '';

  constructor(
    private service: TagsDataService,
    private confirmationService: ConfirmationService,
    private globalNotificationService: GlobalNotificationService) {
  }

  ngOnInit() {
    this.tags = this.service.getTags();
  }

  getTags() {
    this.service.getTags();
  }

  confirmDeletion() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete these tags?',
      accept: () => {
        this.service.deleteTags(this.selectedTags);

      }
    });
  }

  onDelete(tag: Tag): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${tag.name} ?`,
      accept: () => {
        this.service.deleteTags([tag]);
      }
    });
  }
}

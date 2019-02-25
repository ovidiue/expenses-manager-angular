import {Component, OnInit} from '@angular/core';
import {Tag} from '../classes/tag';
import {ConfirmationService, LazyLoadEvent, MessageService} from 'primeng/api';
import {TagService} from '../services/tag.service';
import {GlobalNotificationService} from '../services/global-notification.service';
import {MESSAGES} from '../utils/messages';
import {fadeIn} from '../utils/animations/fadeIn';
import {TABLE_DEFAULTS} from '../utils/table-options';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
  providers: [ConfirmationService, MessageService],
  animations: [fadeIn]
})
export class TagsComponent implements OnInit {
  tags: Tag[] = [];
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

  constructor(private tagService: TagService,
              private confirmationService: ConfirmationService,
              private globalNotificationService: GlobalNotificationService) {
  }

  ngOnInit() {
  }

  getTags(event: LazyLoadEvent): void {
    this.tagService.getTags(event)
    .then(resp => {
      this.tags = resp.content;
      this.tableOptions.totalTableRecords = resp.totalElements;
      this.tableDefaults.loading = false;
    });
  }

  confirmDeletion() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete these tags?',
      accept: () => {
        this.tagService.deleteTags(this.selectedTags)
        .then(() => {
          this.getTags(TABLE_DEFAULTS.query);
          this.globalNotificationService.add(MESSAGES.deletedTags);
        })
        .catch(err => this.globalNotificationService.add(MESSAGES.error));
      }
    });
  }

  onDelete(tag: Tag): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${tag.name} ?`,
      accept: () => {
        this.tagService.deleteTags([tag])
        .then(() => {
          this.getTags(TABLE_DEFAULTS.query);
          this.globalNotificationService.add(MESSAGES.deletedTag);
        })
        .catch(() => this.globalNotificationService.add(MESSAGES.error));
      }
    });
  }
}

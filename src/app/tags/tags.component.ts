import {Component, OnInit} from '@angular/core';
import {Tag} from '../classes/tag';
import {ConfirmationService, MessageService} from 'primeng/api';
import {TagService} from '../services/tag.service';
import {GlobalNotificationService} from '../services/global-notification.service';
import {MESSAGES} from '../utils/messages';
import {fadeIn} from '../utils/animations/fadeIn';

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

  selectedDescription = '';

  constructor(private tagService: TagService,
              private confirmationService: ConfirmationService,
              private globalNotificationService: GlobalNotificationService) {
  }

  ngOnInit() {
    this.getTags();
  }

  getTags(): void {
    this.tagService.getTags().subscribe(tags => {
      this.tags = tags;
    });
  }

  confirmDeletion() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete these tags?',
      accept: () => {
        const ids = this.selectedTags.map(el => el.id);
        console.log('ids to delete', ids);
        this.tagService.deleteTags(this.selectedTags)
        .then(() => {
          this.getTags();
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
          this.getTags();
          this.globalNotificationService.add(MESSAGES.deletedTag);
        })
        .catch(() => this.globalNotificationService.add(MESSAGES.error));
      }
    });
  }

}

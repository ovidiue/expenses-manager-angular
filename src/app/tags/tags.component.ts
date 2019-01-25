import {Component, OnInit} from '@angular/core';
import {Tag} from '../classes/tag';
import {ConfirmationService, MessageService} from 'primeng/api';
import {TagService} from '../tag.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class TagsComponent implements OnInit {
  tags: Tag[] = [];
  selectedTags: Tag[] = [];

  constructor(private tagService: TagService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.getTags();
  }

  getTags(): void {
    this.tagService.getTags().subscribe(tags => {
      console.log('tags: ', tags);
      this.tags = tags;
    });
  }

  confirmDeletion() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete these tags?',
      accept: () => {
        const ids = this.selectedTags.map(el => el.id);
        console.log('ids to delete', ids);
        this.tagService.deleteTags(ids)
        .then(resp => {
          ids.forEach(id => {
            const index = this.tags.findIndex(tag => tag.id === id);
            this.tags.splice(index, 1);
          });
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Succesfully deleted tags...'});
        })
        .catch(err => alert('something went wrong' + err));
      }
    });
  }

  onEdit(tag: Tag): void {
    console.log('edit', tag);
  }

  onDelete(tag: Tag): void {
    console.log('delete', tag);
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${tag.name} ?`,
      accept: () => {
        this.tagService.deleteTags([tag.id])
        .then(resp => {
          this.tags = this.tags.filter(el => el.id !== tag.id);
        });
      }
    });
  }

}

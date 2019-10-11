import { Component, OnInit } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { TagsDataService } from './tags-data.service';
import { Observable } from 'rxjs';
import { fadeIn } from '@utils/animations/fadeIn';
import { TABLE_DEFAULTS } from '@utils/table-options';
import { Tag } from '@models/tag';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
  providers: [ConfirmationService, MessageService, TagsDataService],
  animations: [fadeIn]
})
export class TagsComponent implements OnInit {
  tags$: Observable<Tag[]>;
  total$: Observable<number>;

  selectedTags: Tag[] = [];
  tableDefaults = TABLE_DEFAULTS;

  tableOptions = {
    columns: [
      {name: 'Name', value: 'name'},
      {name: 'Description', value: 'description'},
      {name: 'Color', value: 'color'}
    ]
  };

  selectedDescription = '';

  constructor(
      private service: TagsDataService,
      private confirmationService: ConfirmationService
  ) {
  }

  ngOnInit() {
    this.tags$ = this.service.getTags(TABLE_DEFAULTS.query);
    this.total$ = this.service.getTotal();
  }

  getTags(event: LazyLoadEvent) {
    this.service.getTags(event);
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

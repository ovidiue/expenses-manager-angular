import { Component, OnInit } from '@angular/core';
import { Tag } from '@models/tag';
import { fadeIn } from '@utils/animations/fadeIn';
import { TABLE_DEFAULTS } from '@utils/table-options';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';

import { TagDataService } from '../tag-data.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss'],
  providers: [ConfirmationService, MessageService, TagDataService],
  animations: [fadeIn],
})
export class TagListComponent implements OnInit {
  tags$: Observable<Tag[]>;
  total$: Observable<number>;
  loading$: Observable<boolean> = this.service.getLoadingState();

  selectedTags: Tag[] = [];
  tableDefaults = TABLE_DEFAULTS;

  tableOptions = {
    columns: [
      { name: 'Name', value: 'name' },
      { name: 'Description', value: 'description' },
      { name: 'Color', value: 'color' },
    ],
  };

  selectedDescription = '';

  constructor(
    private service: TagDataService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.tags$ = this.service.getTags(TABLE_DEFAULTS.query);
    this.total$ = this.service.getTotal();
  }

  getTags(event: LazyLoadEvent) {
    // TODO inspect fetching tags mechanism
    this.service.getTags(event);
  }

  confirmDeletion() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete these tags?',
      accept: () => {
        this.service.deleteTags(this.selectedTags);
      },
    });
  }

  onDelete(tag: Tag): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${tag.name} ?`,
      accept: () => {
        this.service.deleteTags([tag]);
      },
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Tag } from '@models/interfaces';
import { fadeIn } from '@utils/animations/fadeIn';
import { TABLE_DEFAULTS } from '@utils/table-options';
import { ConfirmationService, LazyLoadEvent, MessageService, } from 'primeng/api';

import { TagFacade } from '../tag.facade';

@Component({
  selector: 'app-tags',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss'],
  providers: [ConfirmationService, MessageService, TagFacade],
  animations: [fadeIn],
})
export class TagListComponent implements OnInit {
  tags$ = this.tagFacade.tags$;
  total$ = this.tagFacade.total$;
  loading$ = this.tagFacade.loading$;

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
    private tagFacade: TagFacade,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.getTags(null);
  }

  getTags(event: LazyLoadEvent) {
    // TODO inspect fetching tags mechanism
    this.tagFacade.getTags(event);
  }

  confirmDeletion() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete these tags?',
      accept: () => {
        this.tagFacade.deleteTags(this.selectedTags);
      },
    });
  }

  onDelete(tag: Tag): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${tag.name} ?`,
      accept: () => {
        this.tagFacade.deleteTags([tag]);
      },
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Tag } from '@models/interfaces';
import { fadeIn } from '@utils/animations/fadeIn';
import { TABLE_DEFAULTS } from '@utils/table-options';
import { ConfirmationService, LazyLoadEvent, MessageService, } from 'primeng/api';

import { TagFacade } from '../tag.facade';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { OverlayService } from '@shared/modal/overlay.service';
import { TagDetailAddComponent } from '../tag-detail/tag-detail-add.component';

export class TagDataSource extends DataSource<Tag> {
  /** Stream of data that is provided to the table. */
  data = this.tagFacade.tags$;

  constructor(private readonly tagFacade: TagFacade) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Tag[]> {
    return this.data;
  }

  disconnect() {}
}

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

  displayedColumns: string[] = ['name', 'description', 'color', 'actions'];
  dataSource = new TagDataSource(this.tagFacade);

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
    private confirmationService: ConfirmationService,
    private readonly overlayService: OverlayService
  ) {}

  ngOnInit() {
    this.getTags(null);
  }

  getTags(event: LazyLoadEvent) {
    // TODO inspect fetching tags mechanism
    this.tagFacade.getTags(event);
  }

  confirmDeletion() {
    const overlayRef = this.overlayService.open(TagDetailAddComponent, null);
    overlayRef.afterClosed$.subscribe((res) => {
      console.log('modal res', res);
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

  edit(item: Tag) {
    console.log('item', item);
  }
}

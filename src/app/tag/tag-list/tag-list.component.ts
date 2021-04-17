import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { ConfirmationService, MessageService } from 'primeng/api';

import { Tag } from '@models/interfaces';

import { fadeIn } from '@utils/animations/fadeIn';

import { TagFacade } from '../tag.facade';

import { OverlayService } from '@shared/modal/overlay.service';

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
  loading$ = this.tagFacade.loading$;

  tableColumns: string[] = ['name', 'description', 'color', 'actions'];
  dataSource = new TagDataSource(this.tagFacade);

  constructor(
    private tagFacade: TagFacade,
    private confirmationService: ConfirmationService,
    private readonly overlayService: OverlayService
  ) {}

  ngOnInit() {
    this.tagFacade.getTags(null);
  }

  showDeleteDialog(tag: Tag) {
    const overlayRef = this.overlayService.open(
      `<h2>Delete</h2><p>Are you sure you want to delete tag <b>${tag.name}</b>?</p>`,
      null
    );
    overlayRef.afterClosed$.subscribe((res) => {
      if (res.data) {
        this.tagFacade.deleteTags([tag]).subscribe(() => {
          this.tagFacade.getTags(null);
        });
      }
    });
  }

  edit(item: Tag) {
    console.log('item', item);
  }
}

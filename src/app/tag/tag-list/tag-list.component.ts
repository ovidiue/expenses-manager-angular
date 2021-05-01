import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Tag } from '@models/interfaces';

import { fadeIn } from '@utils/animations/fadeIn';

import { TagFacade } from '../tag.facade';

import { TranslocoService } from '@ngneat/transloco';
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
  animations: [fadeIn],
})
export class TagListComponent implements OnInit {
  loading$ = this.tagFacade.loading$;

  tableColumns: string[] = ['name', 'description', 'color', 'actions'];
  dataSource = new TagDataSource(this.tagFacade);

  constructor(
    private tagFacade: TagFacade,
    private readonly overlayService: OverlayService,
    private readonly _translocoService: TranslocoService
  ) {}

  ngOnInit() {
    this.tagFacade.getTags(null);
  }

  showDeleteDialog(tag: Tag) {
    const text = this._translocoService.translate('TAG.LIST.DELETE', {
      tagName: tag.name,
    });
    const overlayRef = this.overlayService.open(text, null);
    overlayRef.afterClosed$.subscribe((res) => {
      if (res.data) {
        this.tagFacade.deleteTags([tag]).subscribe(() => {
          this.tagFacade.getTags(null);
        });
      }
    });
  }
}

import {Injectable} from '@angular/core';
import {TagService} from '../../services/tag.service';
import {Tag} from '../../models/tag';
import {BehaviorSubject, Observable} from 'rxjs';
import {GlobalNotificationService} from '../../services/global-notification.service';
import {MESSAGES} from '../../utils/messages';
import {LazyLoadEvent} from 'primeng/api';
import {TABLE_DEFAULTS} from '../../utils/table-options';
import * as _ from 'lodash';

@Injectable()
export class TagsDataService {
  private _tags: BehaviorSubject<Tag[]> = new BehaviorSubject([]);
  private _total: BehaviorSubject<Number> = new BehaviorSubject(0);

  private event: LazyLoadEvent;

  constructor(
    private tagService: TagService,
    private globalNotificationService: GlobalNotificationService) {
    this.loadInitialData(TABLE_DEFAULTS.query);
  }

  isSameEvent(event: LazyLoadEvent): boolean {
    return _.isEqual(event, this.event);
  }

  deleteTags(ids: Tag[]) {
    return this.tagService.delete(ids)
    .subscribe(() => {
        let tags = this._tags.getValue();
        tags = tags.filter(tag => !ids.includes(tag));
        this.globalNotificationService.add(MESSAGES.deletedCategory);
        const updatedTotal = parseInt(this._total.getValue().toFixed()) - 1;
        this._total.next(updatedTotal);
        this._tags.next(tags);
      },
      () => this.globalNotificationService.add(MESSAGES.error));
  }

  public getTags(event: LazyLoadEvent): Observable<any> {
    if (!this.isSameEvent(event)) {
      this.event = event;
      this.loadInitialData(event);
    }

    return this._tags.asObservable();
  }

  public getTotal(): Observable<any> {
    return this._total.asObservable();
  }

  private loadInitialData(event: LazyLoadEvent) {
    this.tagService.getAll(event)
    .subscribe(
      resp => {
        this._tags.next(resp.content);
        this._total.next(resp.totalElements);
      }
    );
  }

}

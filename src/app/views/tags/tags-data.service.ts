import {Injectable} from '@angular/core';
import {TagService} from '../../services/tag.service';
import {Tag} from '../../models/tag';
import {BehaviorSubject, Observable} from 'rxjs';
import {GlobalNotificationService} from '../../services/global-notification.service';
import {MESSAGES} from '../../utils/messages';

@Injectable()
export class TagsDataService {
  private _tags: BehaviorSubject<Tag[]> = new BehaviorSubject([]);
  private _total: BehaviorSubject<Number> = new BehaviorSubject(0);

  constructor(
    private tagService: TagService,
    private globalNotificationService: GlobalNotificationService) {
    this.loadInitialData();
  }

  deleteTags(ids: Tag[]) {
    return this.tagService.delete(ids)
    .subscribe(() => {
        let tags = this._tags.getValue();
        tags = tags.filter(tag => !ids.includes(tag));
        this.globalNotificationService.add(MESSAGES.deletedCategory);
        return this._tags.next(tags);
      },
      () => this.globalNotificationService.add(MESSAGES.error));
  }

  public getTags(): Observable<any> {
    return this._tags.asObservable();
  }

  public getTotal(): Observable<any> {
    return this._total.asObservable();
  }

  private loadInitialData() {
    this.tagService.getAll()
    .subscribe(
      resp => {
        this._tags.next(resp.content);
        this._total.next(resp.totalElements);
      }
    );
  }

}

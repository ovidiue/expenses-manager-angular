import {Injectable} from '@angular/core';
import {TagService} from '../../services/tag.service';
import {Tag} from '../../models/tag';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable()
export class TagsDataService {
  private _tags: BehaviorSubject<Tag[]> = new BehaviorSubject([]);

  constructor(private tagService: TagService) {
    this.loadInitialData();
  }

  deleteTags(ids: Tag[]) {
    return this.tagService.delete(ids)
    .subscribe(() => {
      let tags = this._tags.getValue();
      tags = tags.filter(tag => !ids.includes(tag));
      return this._tags.next(tags);
    });
  }

  public getTags(): Observable<any> {
    return this._tags.asObservable();
  }

  private loadInitialData() {
    this.tagService.getAll()
    .subscribe(
      resp => {
        this._tags.next(resp.content);
      }
    );
  }

}

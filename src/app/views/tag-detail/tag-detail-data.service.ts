import {Injectable} from '@angular/core';
import {TagService} from '../../services/tag.service';
import {Tag} from '../../models/tag';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagDetailDataService {
  constructor(private tagService: TagService) {
  }

  getTag(id: number) {
    return this.tagService.get(id);
  }

  getTagByName(name: string): Observable<Tag> {
    return name.length ? this.tagService.getByName(name) : new Observable();
  }

  saveTag(tag: Tag) {
    return this.tagService.save(tag);
  }
}

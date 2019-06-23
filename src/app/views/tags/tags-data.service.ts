import {Injectable} from '@angular/core';
import {TagService} from '../../services/tag.service';
import {LazyLoadEvent} from 'primeng/api';
import {Tag} from '../../models/tag';

@Injectable({
  providedIn: 'root'
})
export class TagsDataService {
  constructor(private tagService: TagService,) {}

  getTags(event: LazyLoadEvent) {
    return this.tagService.getAll(event);
  }

  deleteTags(ids: Tag[]) {
    return this.tagService.delete(ids);
  }
}

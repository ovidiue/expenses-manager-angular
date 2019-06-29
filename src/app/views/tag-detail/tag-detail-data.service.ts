import {Injectable} from '@angular/core';
import {TagService} from '../../services/tag.service';
import {Tag} from '../../models/tag';

@Injectable({
  providedIn: 'root'
})
export class TagDetailDataService {
  constructor(private tagService: TagService) {
  }

  getTag(id: number) {
    return this.tagService.get(id);
  }

  getTagByName(name: string) {
    return this.tagService.getByName(name);
  }

  saveTag(tag: Tag) {
    return this.tagService.save(tag);
  }
}

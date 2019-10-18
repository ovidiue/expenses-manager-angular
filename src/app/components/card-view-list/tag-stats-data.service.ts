import { Injectable } from '@angular/core';
import { TagService } from '@services/tag.service';
import { Card } from '@models/interfaces/card';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagStatsDataService {
  constructor(private tagService: TagService) {
  }

  getCardStats(): Observable<Card[]> {
    return this.tagService.getStats();
  }
}

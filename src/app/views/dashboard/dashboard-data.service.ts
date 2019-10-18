import { Injectable } from '@angular/core';
import { TagService } from '@services/tag.service';
import { CategoryService } from '@services/category.service';
import { Observable } from 'rxjs';
import { Card } from '@models/interfaces/card';

@Injectable({
  providedIn: 'root'
})
export class DashboardDataService {
  constructor(
      private tagService: TagService,
      private categoriesService: CategoryService
  ) {
  }

  getTagStats(): Observable<Card[]> {
    return this.tagService.getStats();
  }

  getCategoriesStats(): Observable<Card[]> {
    return this.categoriesService.getStats();
  }
}

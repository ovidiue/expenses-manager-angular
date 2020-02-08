import { Injectable } from '@angular/core';
import { Card } from '@models/interfaces/card';
import { CategoryService } from '@services/category.service';
import { TagService } from '@services/tag.service';
import { Observable } from 'rxjs';

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

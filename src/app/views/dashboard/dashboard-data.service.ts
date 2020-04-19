import { Injectable } from '@angular/core';
import { CategoryService, TagService } from '@core/services';
import { Card } from '@models/interfaces/card';
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

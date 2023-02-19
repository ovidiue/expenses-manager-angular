import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Card } from '@models/interfaces';

import { CategoryService, TagService } from '@core/services';

@Injectable({
  providedIn: 'root',
})
export class DashboardDataService {
  constructor(
    private tagService: TagService,
    private categoriesService: CategoryService
  ) {}

  getTagStats(): Observable<Card[]> {
    return this.tagService.getStats();
  }

  getCategoriesStats(): Observable<Card[]> {
    return this.categoriesService.getStats();
  }
}

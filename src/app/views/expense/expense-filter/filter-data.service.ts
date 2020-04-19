import { Injectable } from '@angular/core';
import { CategoryService, TagService } from '@core/services';

import { Category } from '@models/category';
import { Tag } from '@models/tag';
import { SelectItem } from 'primeng/api';
import { BehaviorSubject, Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export default class FilterDataService {
  private readonly _categories: BehaviorSubject<SelectItem[]>;
  private readonly _tags: BehaviorSubject<SelectItem[]>;

  constructor(private categoryService: CategoryService, private tagService: TagService) {
    this._categories = new BehaviorSubject<SelectItem[]>([]);
    this._tags = new BehaviorSubject<SelectItem[]>([]);

    this.loadCategories();
    this.loadTags();
  }

  getCategories(): Observable<SelectItem[]> {
    return this._categories.asObservable();
  }

  getTags(): Observable<SelectItem[]> {
    return this._tags.asObservable();
  }

  private loadCategories() {
    this.categoryService
      .getAll(null)
      .pipe(pluck('content'))
      .subscribe((resp: Category[]) => {
        const mapped = resp.map((el) => ({ label: el.name, value: el }));
        this._categories.next(mapped);
      });
  }

  private loadTags() {
    this.tagService
      .getAll(null)
      .pipe(pluck('content'))
      .subscribe((resp: Tag[]) =>
        this._tags.next(resp.map((el) => ({ label: el.name, value: el })))
      );
  }
}

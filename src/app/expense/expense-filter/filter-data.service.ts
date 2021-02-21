import { Injectable } from '@angular/core';
import { CategoryService, TagService } from '@core/services';
import { Category, Tag } from '@models/interfaces';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export default class FilterDataService {
  private readonly _categories: BehaviorSubject<Category[]>;
  private readonly _tags: BehaviorSubject<Tag[]>;

  constructor(
    private categoryService: CategoryService,
    private tagService: TagService
  ) {
    this._categories = new BehaviorSubject<Category[]>([]);
    this._tags = new BehaviorSubject<Tag[]>([]);

    this.loadCategories();
    this.loadTags();
  }

  getCategories(): Observable<Category[]> {
    return this._categories.asObservable();
  }

  getTags(): Observable<Tag[]> {
    return this._tags.asObservable();
  }

  private loadCategories() {
    this.categoryService
      .getAll(null)
      .pipe(map((result) => result.data))
      .subscribe((resp: Category[]) => {
        this._categories.next(resp);
      });
  }

  private loadTags() {
    this.tagService
      .getAll(null)
      .pipe(map((result) => result.data))
      .subscribe((resp: Tag[]) => this._tags.next(resp));
  }
}

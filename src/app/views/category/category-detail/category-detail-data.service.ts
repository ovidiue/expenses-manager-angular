import { Injectable } from '@angular/core';
import { Category } from '@models/category';
import { CategoryService } from '@services/category.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryDetailDataService {
  constructor(
      private service: CategoryService
  ) {
  }

  getCategory(catId: number): Observable<Category> {
    return this.service.get(catId);
  }

  getCategoryByName(name: string): Observable<Category> {
    return this.service.getByName(name);
  }

  updateCategory(category: Category): Observable<any> {
    return this.service.update(category);
  }

  saveCategory(category: Category): Observable<any> {
    return this.service.save(category);
  }
}

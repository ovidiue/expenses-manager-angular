import {Injectable} from '@angular/core';
import {CategoryService} from '../../services/category-service.service';
import {Category} from '../../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryDetailDataService {
  constructor(
    private service: CategoryService
  ) {}

  getCategory(catId: number): Promise<Category> {
    return this.service.get(catId);
  }

  getCategoryByName(name: string): Promise<Category> {
    return this.service.getByName(name);
  }

  updateCategory(category: Category, id: number): Promise<Category> {
    return this.service.update(category, id);
  }

  saveCategory(category: Category): Promise<Category> {
    return this.service.save(category);
  }
}

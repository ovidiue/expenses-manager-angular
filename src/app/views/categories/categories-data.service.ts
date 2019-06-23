import {Injectable} from '@angular/core';
import {CategoryService} from '../../services/category.service';
import {LazyLoadEvent} from 'primeng/api';

@Injectable({providedIn: 'root'})
export class CategoriesDataService {
  constructor(private service: CategoryService) {
  }

  public deleteCategory(ids: number[], withExpense: boolean) {
    return this.service.delete(ids, withExpense);
  }

  public getAllCategories(event: LazyLoadEvent) {
    return this.service.getAll(event);
  }
}

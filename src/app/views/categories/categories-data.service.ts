import {Injectable} from '@angular/core';
import {CategoryService} from '../../services/category.service';
import {BehaviorSubject} from 'rxjs';
import {Category} from '../../models/category';
import {GlobalNotificationService} from '../../services/global-notification.service';
import {MESSAGES} from '../../utils/messages';
import {TABLE_DEFAULTS} from '../../utils/table-options';
import {LazyLoadEvent} from 'primeng/api';

@Injectable()
export class CategoriesDataService {
  private _categories: BehaviorSubject<Category[]>;
  private _total: BehaviorSubject<number>;

  constructor(
    private service: CategoryService,
    private globaNotificationService: GlobalNotificationService
  ) {
    this._categories = new BehaviorSubject([]);
    this._total = new BehaviorSubject(0);

    this.loadFromServer(TABLE_DEFAULTS.query);
  }

  public deleteCategory(ids: number[], withExpense: boolean) {
    this.service.delete(ids, withExpense)
    .subscribe(
      () => {
        let categories = this._categories.getValue();
        categories = categories.filter(el => !ids.includes(el.id));
        const newTotal = this._total.getValue() - ids.length;
        this._total.next(newTotal);
        this._categories.next(categories);
      },
      () => this.globaNotificationService.add(MESSAGES.ERROR)
    );

    return this._categories;
  }

  public getTotal() {
    return this._total.asObservable();
  }

  public getCategories(event: LazyLoadEvent) {
    this.loadFromServer(event);
    return this._categories.asObservable();
  }

  private loadFromServer(event: LazyLoadEvent) {
    this.service.getAll(event).subscribe(
      (resp) => {
        this._categories.next(resp.content);
        this._total.next(resp.totalElements);
      },
      () => this.globaNotificationService.add(MESSAGES.ERROR));
  }
}

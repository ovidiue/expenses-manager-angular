import {Injectable} from '@angular/core';
import {CategoryService} from '../../services/category.service';
import {BehaviorSubject, of} from 'rxjs';
import {Category} from '../../models/category';
import {GlobalNotificationService} from '../../services/global-notification.service';
import {MESSAGES} from '../../utils/messages';
import {TABLE_DEFAULTS} from '../../utils/table-options';
import {LazyLoadEvent} from 'primeng/api';
import {catchError, switchMap} from 'rxjs/operators';

@Injectable()
export class CategoriesDataService {
  private readonly _categories: BehaviorSubject<Category[]>;
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
    return this.service.delete(ids, withExpense)
    .pipe(
      catchError(() => of(this.globaNotificationService.add(MESSAGES.ERROR))),
      switchMap((deletedCategories) => {
        let categories = this._categories.getValue();
        categories = categories.filter(el => !deletedCategories.includes(el.id));
        const newTotal = this._total.getValue() - ids.length;
        this._total.next(newTotal);
        this._categories.next(categories);
        return of(deletedCategories);
      })
    );
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
        const {content, totalElements} = resp;
        this._categories.next(content);
        this._total.next(totalElements);
      },
      () => this.globaNotificationService.add(MESSAGES.ERROR));
  }
}

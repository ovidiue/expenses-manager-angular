import { Injectable } from '@angular/core';
import { CategoryService } from '@services/category.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Category } from '@models/category';
import { GlobalNotificationService } from '@services/global-notification.service';
import { MESSAGES } from '@utils/messages';
import { TABLE_DEFAULTS } from '@utils/table-options';
import { LazyLoadEvent } from 'primeng/api';
import { catchError, finalize, switchMap } from 'rxjs/operators';

@Injectable()
export class CategoriesDataService {
  private readonly _categories: BehaviorSubject<Category[]>;
  private _total: BehaviorSubject<number>;
  private _loading: BehaviorSubject<boolean>;

  constructor(
      private service: CategoryService,
      private globaNotificationService: GlobalNotificationService
  ) {
    this._categories = new BehaviorSubject([]);
    this._total = new BehaviorSubject(0);
    this._loading = new BehaviorSubject<boolean>(false);

    this.loadFromServer(TABLE_DEFAULTS.query);
  }

  public deleteCategory(ids: number[], withExpense: boolean) {
    this._loading.next(true);
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
            }),
            finalize(() => this._loading.next(false))
        );
  }

  public getTotal() {
    return this._total.asObservable();
  }

  public getCategories(event: LazyLoadEvent) {
    this.loadFromServer(event);
    return this._categories.asObservable();
  }

  public getLoading(): Observable<boolean> {
    return this._loading.asObservable();
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

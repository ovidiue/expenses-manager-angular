import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryService } from '@core/services';
import { Category } from '@models/interfaces';

import { MESSAGES } from '@utils/messages';
import { TABLE_DEFAULTS } from '@utils/table-options';

import { ToastrService } from 'ngx-toastr';

import { LazyLoadEvent } from 'primeng/api';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';

@Injectable()
export class CategoryDataService {
  private readonly _categories: BehaviorSubject<Category[]>;
  private _total: BehaviorSubject<number>;
  private _loading: BehaviorSubject<boolean>;
  private _loadingMessage: BehaviorSubject<string>;

  constructor(private service: CategoryService, private toastr: ToastrService) {
    this._categories = new BehaviorSubject([]);
    this._total = new BehaviorSubject(0);
    this._loading = new BehaviorSubject<boolean>(false);
    this._loadingMessage = new BehaviorSubject<string>('');

    this.loadFromServer(TABLE_DEFAULTS.query);
  }

  getCategory(catId: number): Observable<Category> {
    this._loading.next(true);
    this.setMessage(`Fetching category with id ${catId}`);

    return this.service.get(catId).pipe(
      catchError((err: HttpErrorResponse) => {
        this.toastr.error(`Failed getting category with id: ${catId}`, 'Error');

        return throwError(err);
      }),
      finalize(() => {
        this._loading.next(false);
        this.clearMessage();
      })
    );
  }

  getCategoryByName(name: string): Observable<Category> {
    return this.service.getByName(name);
  }

  updateCategory(category: Category): Observable<any> {
    this._loading.next(true);
    this.setMessage(`Updating category ${category.name}`);

    return this.service.update(category).pipe(
      catchError((err: HttpErrorResponse) => {
        this.toastr.error(
          `'Failed updating category ${category.name}`,
          'Update'
        );

        return throwError(err);
      }),
      tap(() => {
        this.toastr.success('Success updating category', 'Success');
      }),
      finalize(() => {
        this._loading.next(false);
        this.clearMessage();
      })
    );
  }

  saveCategory(category: Category): Observable<any> {
    this._loading.next(true);
    this.setMessage(`Saving category ${category.name}`);

    return this.service.save(category).pipe(
      catchError((err: HttpErrorResponse) => {
        this.toastr.error(`Failed saving category ${category.name}`, 'Fail');

        return throwError(err);
      }),
      tap(() => {
        this.toastr.success(
          `Success saving new category ${category.name}`,
          'Save'
        );
      }),
      finalize(() => {
        this._loading.next(false);
      })
    );
  }

  public deleteCategory(
    ids: number[],
    withExpense: boolean
  ): Observable<any[]> {
    this._loading.next(true);

    return this.service.delete(ids, withExpense).pipe(
      catchError((err: HttpErrorResponse) => {
        this.toastr.error(err.message, MESSAGES.ERROR);
        return throwError(err);
      }),
      tap((deletedCategories: Category[]) => {
        const categories = this._categories.getValue();

        const filteredCategories = categories.reduce((acc, curr) => {
          if (!deletedCategories.find((el) => el.id === curr.id)) {
            acc.push(curr);
          }

          return acc;
        }, [] as Category[]);

        const newTotal = this._total.getValue() - ids.length;
        this._total.next(newTotal);
        this._categories.next(filteredCategories);

        this.toastr.success(
          MESSAGES.CATEGORY.DELETED_MULTIPLE,
          ids.length.toString()
        );
      }),
      finalize(() => {
        this._loading.next(false);
      })
    );
  }

  public getTotal(): Observable<number> {
    return this._total.asObservable();
  }

  public getCategories(event: LazyLoadEvent): Observable<Category[]> {
    this.loadFromServer(event);

    return this._categories.asObservable();
  }

  public getLoading(): Observable<boolean> {
    return this._loading.asObservable();
  }

  public getLoadingMessage(): Observable<string> {
    return this._loadingMessage.asObservable();
  }

  private setMessage(msg: string) {
    this._loadingMessage.next(msg);
  }

  private clearMessage() {
    this.setMessage('');
  }

  private loadFromServer(event: LazyLoadEvent): void {
    this._loading.next(true);
    this.service
      .getAll(event)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.toastr.error(err.message, MESSAGES.ERROR);

          return throwError(err);
        }),
        finalize(() => {
          this._loading.next(false);
        })
      )
      .subscribe((resp) => {
        const { data, total } = resp;
        this._categories.next(data);
        this._total.next(total);
      });
  }
}

import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';

import { Category } from '@models/interfaces';

import { MESSAGES } from '@utils/messages';

import { CategoryService } from '@core/services';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class CategoryFacade {
  get categories$() {
    return this._categories$.asObservable();
  }

  get loading$() {
    return this._loading$.asObservable();
  }

  get loadingMsg$() {
    return this._loadingMessage$.asObservable();
  }
  private readonly _categories$: BehaviorSubject<Category[]> =
    new BehaviorSubject([]);
  private _loadingMessage$: BehaviorSubject<string> =
    new BehaviorSubject<string>('');

  private _total$: BehaviorSubject<number> = new BehaviorSubject(0);

  private _loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(
    private readonly _categoryService: CategoryService,
    private readonly _toastrService: ToastrService
  ) {
    this.getCategories(null);
  }

  getCategory(catId: number): Observable<Category> {
    this._loading$.next(true);
    this.setMessage(`Fetching category with id ${catId}`);

    return this._categoryService.get(catId).pipe(
      catchError((err: HttpErrorResponse) => {
        this._toastrService.error(
          `Failed getting category with id: ${catId}`,
          'Error'
        );

        return throwError(() => err);
      }),
      finalize(() => {
        this._loading$.next(false);
        this.setMessage('');
      })
    );
  }

  getCategoryByName(name: string): Observable<Category> {
    return this._categoryService.getByName(name);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateCategory(category: Category): Observable<any> {
    this._loading$.next(true);
    this.setMessage(`Updating category ${category.name}`);

    return this._categoryService.update(category).pipe(
      catchError((err: HttpErrorResponse) => {
        this._toastrService.error(
          `'Failed updating category ${category.name}`,
          'Update'
        );

        return throwError(() => err);
      }),
      tap(() => {
        this._toastrService.success('Success updating category', 'Success');
      }),
      finalize(() => {
        this._loading$.next(false);
        this.setMessage('');
      })
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  saveCategory(category: Category): Observable<any> {
    this._loading$.next(true);
    this.setMessage(`Saving category ${category.name}`);

    return this._categoryService.save(category).pipe(
      catchError((err: HttpErrorResponse) => {
        this._toastrService.error(
          `Failed saving category ${category.name}`,
          'Fail'
        );

        return throwError(() => err);
      }),
      tap(() => {
        this._toastrService.success(
          `Success saving new category ${category.name}`,
          'Save'
        );
      }),
      finalize(() => {
        this._loading$.next(false);
      })
    );
  }

  public deleteCategory(
    ids: number[],
    withExpense: boolean
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Observable<any[]> {
    this._loading$.next(true);

    return this._categoryService.delete(ids, withExpense).pipe(
      catchError((err: HttpErrorResponse) => {
        this._toastrService.error(err.message, MESSAGES.ERROR);

        return throwError(() => err);
      }),
      tap((deletedCategories: Category[]) => {
        const categories = this._categories$.getValue();

        const filteredCategories = categories.reduce((acc, curr) => {
          if (!deletedCategories.find((el) => el.id === curr.id)) {
            acc.push(curr);
          }

          return acc;
        }, [] as Category[]);

        const newTotal = this._total$.getValue() - ids.length;
        this._total$.next(newTotal);
        this._categories$.next(filteredCategories);

        this._toastrService.success(
          MESSAGES.CATEGORY.DELETED_MULTIPLE,
          ids.length.toString()
        );
      }),
      finalize(() => {
        this._loading$.next(false);
      })
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getCategories(event: any): void {
    this._loading$.next(true);
    this._categoryService
      .getAll(event)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this._toastrService.error(err.message, MESSAGES.ERROR);

          return throwError(() => err);
        }),
        finalize(() => {
          this._loading$.next(false);
        })
      )
      .subscribe((resp) => {
        const { data, total } = resp;
        this._categories$.next(data);
        this._total$.next(total);
      });
  }

  private setMessage(msg: string) {
    this._loadingMessage$.next(msg);
  }
}

import { Injectable } from '@angular/core';
import { CategoryService } from '@services/category.service';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Category } from '@models/category';
import { MESSAGES } from '@utils/messages';
import { TABLE_DEFAULTS } from '@utils/table-options';
import { LazyLoadEvent } from 'primeng/api';
import { catchError, finalize, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class CategoriesDataService {
  private readonly _categories: BehaviorSubject<Category[]>;
  private _total: BehaviorSubject<number>;
  private _loading: BehaviorSubject<boolean>;

  constructor(
    private service: CategoryService,
    private toastr: ToastrService
  ) {
    this._categories = new BehaviorSubject([]);
    this._total = new BehaviorSubject(0);
    this._loading = new BehaviorSubject<boolean>(false);

    this.loadFromServer(TABLE_DEFAULTS.query);
  }

  public deleteCategory(ids: number[], withExpense: boolean): Observable<number[]> {
    this._loading.next(true);
    return this.service.delete(ids, withExpense)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.toastr.error(err.message, MESSAGES.ERROR);
          return throwError(err);
        }),
        tap((deletedCategories: number[]) => {
          const categories = this._categories.getValue();
          const updatedCategories = categories.filter(el => !deletedCategories.includes(el.id));
          const newTotal = this._total.getValue() - ids.length;
          this._total.next(newTotal);
          this._categories.next(updatedCategories);
          this.toastr.success(MESSAGES.CATEGORY.DELETED_MULTIPLE, ids.toString());
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

  private loadFromServer(event: LazyLoadEvent): void {
    // this._loading.next(true);
    this.service.getAll(event)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.toastr.error(err.message, MESSAGES.ERROR);
          return throwError(err);
        }),
        finalize(() => {
          // this._loading.next(false);
        })
      )
      .subscribe(
        (resp) => {
          const {content, totalElements} = resp;
          this._categories.next(content);
          this._total.next(totalElements);
        });
  }
}

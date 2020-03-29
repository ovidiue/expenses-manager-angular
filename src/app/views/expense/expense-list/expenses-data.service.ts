import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '@models/category';
import { Expense } from '@models/expense';
import { ExpenseFilter } from '@models/filters/expense-filter';
import { ServerResp } from '@models/interfaces/server-resp';
import { Rate } from '@models/rate';
import { Tag } from '@models/tag';
import { CategoryService } from '@services/category.service';
import { ExpenseService } from '@services/expense.service';
import { RateService } from '@services/rate.service';
import { MESSAGES } from '@utils/messages';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { LazyLoadEvent } from 'primeng/api';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, finalize, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExpensesDataService {
  private _loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private expenses$ = new BehaviorSubject<Expense[]>([]);
  private categories$ = new BehaviorSubject<Category[]>([]);
  private tags$ = new BehaviorSubject<Tag[]>([]);
  private total$ = new BehaviorSubject<number>(0);
  private visibleModal$ = new BehaviorSubject<boolean>(false);
  private event: LazyLoadEvent = null;

  constructor(
    private readonly expenseService: ExpenseService,
    private readonly rateService: RateService,
    private readonly categoryService: CategoryService,
    private readonly toastr: ToastrService
  ) {
  }

  getModalVisible() {
    return this.visibleModal$.asObservable();
  }

  setModalVisibility(value: boolean) {
    this.visibleModal$.next(value);
  }

  public getLoadingState(): Observable<boolean> {
    return this._loading.asObservable();
  }

  fetchCategoriesApi() {
    this.categoryService.getAll()
      .pipe(catchError((err: HttpErrorResponse) => {
        this.toastr.error(err.message, 'Failed fetching categories');

        return throwError(err);
      }))
      .subscribe((resp) => {
        this.categories$.next(resp.content);
      });
  }

  fetchExpensesApi(event: LazyLoadEvent, expenseFilter?: ExpenseFilter): void {
    this.setLoading(true);
    this.event = event;

    this.expenseService.getAll(event, expenseFilter)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.toastr.error(err.message, MESSAGES.ERROR);

          return throwError(err);
        }),
        map((resp) => ({data: resp.content, total: resp.totalElements})),
        finalize(() => this.setLoading(false))
      ).subscribe(result => {
      this.expenses$.next(result.data);
      this.total$.next(result.total);
    });
  }

  getExpenses() {
    return this.expenses$.asObservable();
  }

  getTags() {
    return this.tags$.asObservable();
  }

  getCategories() {
    return this.categories$.asObservable();
  }

  getTotal() {
    return this.total$.asObservable();
  }

  setCategoryApi(expIds: number[], catId: number) {
    this.setLoading(true);

    this.expenseService.setCategory(expIds, catId)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.toastr.error(err.message, MESSAGES.ERROR);

          return throwError(err);
        }),
        finalize(() => this.setLoading(false))
      )
      .subscribe(resp => {
        this.fetchExpensesApi(this.event);
      });
  }

  deleteExpensesApi(ids: number[], withRates: boolean) {
    this.setLoading(true);
    this.setModalVisibility(true);

    this.expenseService.delete(ids, withRates)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.toastr.error(err.message, MESSAGES.ERROR);

          return throwError(err);
        }),
        tap((resp) => {
          const msg = ids.length ? MESSAGES.EXPENSE.DELETE_MULTIPLE : MESSAGES.EXPENSE.DELETE_SINGLE;
          this.toastr.success(msg, 'Delete');
        }),
        finalize(() => {
          this.setLoading(false);
          this.setModalVisibility(false);
        })
      )
      .subscribe(() => this.fetchExpensesApi(this.event));
  }

  getRatesByExpenseIdApi(id: number): Observable<ServerResp<Rate[]>> {
    return this.rateService.getRatesByExpenseId(id)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.toastr.error(err.message, MESSAGES.ERROR);

          return throwError(err);
        }),
      );
  }

  mapToExpenseFilter(obj: any): ExpenseFilter {
    const expenseFilter: ExpenseFilter = {};

    if (obj.amount) {
      obj.amountFrom = obj.amount[0];
      obj.amountTo = obj.amount[1];
      delete obj.amount;
    }

    if (obj.createdBetween) {
      obj.createdFrom = moment(obj.createdBetween[0]).format('DD-MM-YYYY');
      obj.createdTo = moment(obj.createdBetween[1]).format('DD-MM-YYYY');
      delete obj.createdBetween;
    }

    if (obj.dueBetween) {
      obj.dueDateFrom = moment(obj.dueBetween[0]).format('DD-MM-YYYY');
      obj.dueDateTo = moment(obj.dueBetween[1]).format('DD-MM-YYYY');
      delete obj.dueBetween;
    }

    if (obj.category) {
      obj.categoryId = obj.category.id;
      delete obj.category;
    }

    if (obj.tags) {
      obj.tagIds = obj.tags.map(tag => tag.id);
      delete obj.tags;
    }

    for (const key in obj) {
      if (obj[key] !== null && typeof obj[key] !== 'undefined' && obj[key] !== '') {
        expenseFilter[key] = obj[key];
      }
    }

    return expenseFilter;

  }

  private setLoading(state: boolean): void {
    this._loading.next(state);
  }
}

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Expense, ExpenseFilter, ServerResp } from '@models/interfaces';
import { ApiPath } from '@utils/constants/api-paths';
import mapToRestParams from '@utils/map-rest-params';
import { PathBuilder } from '@utils/path-builder';
import { LazyLoadEvent } from 'primeng/api';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private EXPENSES_BASE_URL = PathBuilder.get(ApiPath.EXPENSES);

  constructor(private http: HttpClient) {}

  getAll(
    event: LazyLoadEvent,
    expenseFilter?: ExpenseFilter
  ): Observable<ServerResp<Expense>> {
    let params: HttpParams = mapToRestParams(event);
    for (const key in expenseFilter) {
      if (expenseFilter.hasOwnProperty(key)) {
        params = params.append(key, expenseFilter[key]);
      }
    }

    return this.http.get<ServerResp<Expense>>(this.EXPENSES_BASE_URL, {
      params,
    });
  }

  save(expense: Expense): Observable<any> {
    const url = this.EXPENSES_BASE_URL + '/save';

    return this.http.post(url, expense, httpOptions);
  }

  delete(expenseIds: number[], withRates: boolean): Observable<any> {
    let params: HttpParams = new HttpParams();
    params = params.append('ratesToo', withRates.toString());
    const url = this.EXPENSES_BASE_URL + '/delete';

    return this.http.post(url, expenseIds, { params });
  }

  get(exId: number): Observable<Expense> {
    const url = this.EXPENSES_BASE_URL + '/expense/' + exId;

    return this.http.get<Expense>(url);
  }

  setCategory(expenseIds: number[], categoryId: number): Observable<any> {
    const url = `${this.EXPENSES_BASE_URL}/set-category/${categoryId}`;

    return this.http.post(url, expenseIds);
  }

  getStats(): Observable<any> {
    const url = this.EXPENSES_BASE_URL + '/expense-stats';

    return this.http.get(url);
  }

  getSimpleExpenses(): Observable<any[]> {
    const url = this.EXPENSES_BASE_URL + '/simple-expenses$';

    return this.http.get<any[]>(url);
  }

  update(expense: Expense): Observable<any> {
    const url = this.EXPENSES_BASE_URL + '/update';

    return this.http.put(url, expense);
  }
}

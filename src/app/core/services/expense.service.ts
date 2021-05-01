import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { LazyLoadEvent } from 'primeng/api';

import { Expense, ExpenseFilter, ServerResp } from '@models/interfaces';

import { ApiPath } from '@utils/constants/api-paths';
import mapToRestParams from '@utils/map-rest-params';
import { PathBuilder } from '@utils/path-builder';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private readonly _EXPENSES_BASE_URL = PathBuilder.get(ApiPath.EXPENSES);

  constructor(private readonly _httpClient: HttpClient) {}

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

    return this._httpClient.get<ServerResp<Expense>>(this._EXPENSES_BASE_URL, {
      params,
    });
  }

  save(expense: Expense): Observable<any> {
    const url = this._EXPENSES_BASE_URL + '/save';

    return this._httpClient.post(url, expense, httpOptions);
  }

  delete(expenseIds: number[], withRates: boolean): Observable<any> {
    let params: HttpParams = new HttpParams();
    params = params.append('ratesToo', withRates.toString());
    const url = this._EXPENSES_BASE_URL + '/delete';

    return this._httpClient.post(url, expenseIds, { params });
  }

  get(exId: number): Observable<Expense> {
    const url = this._EXPENSES_BASE_URL + '/expense/' + exId;

    return this._httpClient.get<Expense>(url);
  }

  setCategory(expenseIds: number[], categoryId: number): Observable<any> {
    const url = `${this._EXPENSES_BASE_URL}/set-category/${categoryId}`;

    return this._httpClient.post(url, expenseIds);
  }

  getStats(): Observable<any> {
    const url = this._EXPENSES_BASE_URL + '/expense-stats';

    return this._httpClient.get(url);
  }

  getSimpleExpenses(): Observable<any[]> {
    const url = this._EXPENSES_BASE_URL + '/simple-expenses$';

    return this._httpClient.get<any[]>(url);
  }

  update(expense: Expense): Observable<any> {
    const url = this._EXPENSES_BASE_URL + '/update';

    return this._httpClient.put(url, expense);
  }
}

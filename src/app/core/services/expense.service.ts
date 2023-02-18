import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Expense, ServerResp } from '@models/interfaces';

import { ApiPath } from '@utils/constants/api-paths';
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

  getAll(): Observable<ServerResp<Expense>> {
    return this._httpClient.get<ServerResp<Expense>>(this._EXPENSES_BASE_URL);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  save(expense: Expense): Observable<any> {
    const url = this._EXPENSES_BASE_URL + '/save';

    return this._httpClient.post(url, expense, httpOptions);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setCategory(expenseIds: number[], categoryId: number): Observable<any> {
    const url = `${this._EXPENSES_BASE_URL}/set-category/${categoryId}`;

    return this._httpClient.post(url, expenseIds);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  update(expense: Expense): Observable<any> {
    const url = this._EXPENSES_BASE_URL + '/update';

    return this._httpClient.put(url, expense);
  }
}

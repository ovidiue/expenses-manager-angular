import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Expense } from '@models/expense';
import { ExpenseFilter } from '@models/filters/expense-filter';
import { LazyLoadEvent } from 'primeng/api';
import mapToRestParams from '@utils/MapTableParamsToRest';
import { ApiPath } from '@utils/constants/api-paths';
import { PathBuilder } from '@utils/PathBuilder';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private EXPENSES_BASE_URL = PathBuilder.get(ApiPath.EXPENSES);

  constructor(private http: HttpClient) {
  }

  getAll(event: LazyLoadEvent, expenseFilter?: ExpenseFilter): Observable<any> {
    let params: HttpParams = mapToRestParams(event);
    for (const key in expenseFilter) {
      if (expenseFilter.hasOwnProperty(key)) {
        params = params.append(key, expenseFilter[key]);
      }
    }
    return this.http.get(this.EXPENSES_BASE_URL, {params});
  }

  save(expense: Expense): Observable<any> {
    const url = this.EXPENSES_BASE_URL + '/save';
    return this.http.post(url, expense, httpOptions);
  }

  delete(expenseIds: number[], withRates: boolean): Observable<any> {
    let params: HttpParams = new HttpParams();
    params = params.append('ratesToo', withRates.toString());
    const url = this.EXPENSES_BASE_URL + '/delete';
    return this.http.post(url, expenseIds, {params});
  }

  get(exId: number): Observable<Expense> {
    const url = this.EXPENSES_BASE_URL + '/' + exId;
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
}

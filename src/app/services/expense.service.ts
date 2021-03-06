import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Expense} from '../classes/expense';
import {ExpenseFilter} from '../classes/filters/expense-filter';
import {LazyLoadEvent} from 'primeng/api';
import mapToRestParams from '../utils/MapTableParamsToRest';
import {ApiPath} from '../utils/constants/api-paths';
import {PathBuilder} from '../classes/helper/PathBuilder';

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

  getExpenses(event: LazyLoadEvent, expenseFilter?: ExpenseFilter): Promise<any> {
    let params: HttpParams = mapToRestParams(event);
    for (const key in expenseFilter) {
      if (expenseFilter.hasOwnProperty(key)) {
        params = params.append(key, expenseFilter[key]);
      }
    }
    return this.http.get(this.EXPENSES_BASE_URL, {params}).toPromise();
  }

  saveExpense(expense: Expense): Promise<any> {
    const url = this.EXPENSES_BASE_URL + '/save';
    return this.http.post(url, expense, httpOptions).toPromise();
  }

  deleteExpenses(expenseIds: number[], withRates: boolean): Promise<any> {
    let params: HttpParams = new HttpParams();
    params = params.append('ratesToo', withRates.toString());
    const url = this.EXPENSES_BASE_URL + '/delete';
    return this.http.post(url, expenseIds, {params}).toPromise();
  }

  getExpense(exId: number): Promise<any> {
    const url = this.EXPENSES_BASE_URL + '/' + exId;
    return this.http.get<Expense>(url).toPromise();
  }

  setNewCategory(expenseIds: number[], categoryId: number): Promise<any> {
    const url = `${this.EXPENSES_BASE_URL}/set-category/${categoryId}`;
    return this.http.post(url, expenseIds).toPromise();
  }
}

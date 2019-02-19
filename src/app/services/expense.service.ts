import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Expense} from '../classes/expense';
import {ExpenseFilter} from '../classes/filters/expense-filter';
import {LazyLoadEvent} from 'primeng/api';
import mapToRestParams from '../utils/MapTableParamsToRest';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private expensesBaseUrl = 'http://localhost:8080/expenses';

  constructor(private http: HttpClient) {
  }

  getExpenses(event: LazyLoadEvent, expenseFilter?: ExpenseFilter): Promise<any> {
    let params: HttpParams = mapToRestParams(event);
    for (const key in expenseFilter) {
      if (expenseFilter.hasOwnProperty(key)) {
        params = params.append(key, expenseFilter[key]);
      }
    }
    return this.http.get(this.expensesBaseUrl, {params}).toPromise();
  }

  saveExpense(expense: Expense): Promise<any> {
    const url = this.expensesBaseUrl + '/save';
    return this.http.post(url, expense, httpOptions).toPromise();
  }

  /*
   deleteExpenses(expenseIds: number[]): Promise<any> {
   const urlSearchParams: URLSearchParams = new URLSearchParams();
   expenseIds.forEach(id => urlSearchParams.append('', id.toString()));
   const url = this.expensesBaseUrl + '/delete';
   return this.http.post(url, expenseIds).toPromise();
   }
   */

  deleteExpenses(expenseIds: number[], withRates: boolean): Promise<any> {
    let params: HttpParams = new HttpParams();
    /*params = params.append('', expenseIds.toString());*/
    params = params.append('ratesToo', withRates.toString());
    const url = this.expensesBaseUrl + '/delete';
    return this.http.post(url, expenseIds, {params}).toPromise();
  }

  getExpense(exId: number): Promise<any> {
    const url = this.expensesBaseUrl + '/' + exId;
    return this.http.get<Expense>(url).toPromise();
  }
}

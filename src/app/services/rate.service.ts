import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Rate} from '../models/rate';
import {LazyLoadEvent} from 'primeng/api';
import mapTableParams from '../utils/MapTableParamsToRest';
import {PathBuilder} from '../utils/PathBuilder';
import {ApiPath} from '../utils/constants/api-paths';
import {Observable} from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class RateService {
  private RATES_BASE_URL = PathBuilder.get(ApiPath.RATES);

  constructor(private http: HttpClient) {
  }

  getRates(event: LazyLoadEvent): Observable<any> {
    const params: HttpParams = mapTableParams(event);
    return this.http.get(this.RATES_BASE_URL, {params});
  }

  save(rate: Rate): Promise<any> {
    const url = this.RATES_BASE_URL + '/save';
    return this.http.post(url, rate, httpOptions).toPromise();
  }

  update(rate: Rate, initialExpenseId?: string, initialRateAmount?: string): Promise<any> {
    const url = this.RATES_BASE_URL + '/update';
    let params: HttpParams = new HttpParams();
    if (initialExpenseId) {
      params = params.append('initialExpenseId', initialExpenseId.toString());
    }
    if (initialRateAmount) {
      params = params.append('initialRateAmount', initialRateAmount.toString());
    }
    return this.http.put(url, rate, {params}).toPromise();
  }

  deleteRates(rateIds: number[]): Observable<any> {
    const urlSearchParams: URLSearchParams = new URLSearchParams();
    rateIds.forEach(id => urlSearchParams.append('', id.toString()));
    const url = this.RATES_BASE_URL + '/delete';
    return this.http.post(url, rateIds);
  }

  get(rateId: number): Promise<any> {
    const url = this.RATES_BASE_URL + '/' + rateId;
    return this.http.get(url).toPromise();
  }

  getByName(name: string): Promise<any> {
    const url = this.RATES_BASE_URL + '/name/' + name;
    return this.http.get<Rate>(url).toPromise();
  }

  getRatesByExpenseId(id: number): Promise<any> {
    const url = this.RATES_BASE_URL + '/exp';
    let params: HttpParams = new HttpParams();
    params = params.append('expId', id.toString());
    return this.http.get<Rate[]>(url, {params}).toPromise();
  }

  getRatesByExpenseIds(id: number[], event: LazyLoadEvent): Observable<any> {
    const url = this.RATES_BASE_URL + '/expenses';
    let params: HttpParams = mapTableParams(event);
    params = params.append('expenseIds', id.toString());
    return this.http.get<Rate[]>(url, {params});
  }
}

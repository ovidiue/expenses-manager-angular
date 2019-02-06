import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Rate} from '../classes/rate';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class RateService {
  private ratesBaseUrl = 'http://localhost:8080/rates';

  constructor(private http: HttpClient) {
  }

  getRates(): Promise<any> {
    return this.http.get(this.ratesBaseUrl).toPromise();
  }

  save(rate: Rate): Promise<any> {
    const url = this.ratesBaseUrl + '/save';
    return this.http.post(url, rate, httpOptions).toPromise();
  }

  update(rate: Rate, initialExpenseId?: string, initialRateAmount?: string): Promise<any> {
    const url = this.ratesBaseUrl + '/update';
    let params: HttpParams = new HttpParams();
    if (initialExpenseId) {
      params = params.append('initialExpenseId', initialExpenseId.toString());
    }
    if (initialRateAmount) {
      params = params.append('initialRateAmount', initialRateAmount.toString());
    }
    return this.http.put(url, rate, {params}).toPromise();
  }

  deleteRates(rateIds: number[]): Promise<any> {
    const urlSearchParams: URLSearchParams = new URLSearchParams();
    rateIds.forEach(id => urlSearchParams.append('', id.toString()));
    const url = this.ratesBaseUrl + '/delete';
    return this.http.post(url, rateIds).toPromise();
  }

  get(rateId: number): Promise<any> {
    const url = this.ratesBaseUrl + '/' + rateId;
    return this.http.get(url).toPromise();
  }

  getByName(name: string): Promise<any> {
    const url = this.ratesBaseUrl + '/name/' + name;
    return this.http.get<Rate>(url).toPromise();
  }

  getRatesByExpenseId(id: number): Promise<any> {
    const url = this.ratesBaseUrl + '/exp';
    let params: HttpParams = new HttpParams();
    params = params.append('expId', id.toString());
    return this.http.get<Rate[]>(url, {params}).toPromise();
  }

  getRatesByExpenseIds(id: number[]): Promise<any> {
    const url = this.ratesBaseUrl + '/expenses';
    let params: HttpParams = new HttpParams();
    params = params.append('expenseIds', id.toString());
    return this.http.get<Rate[]>(url, {params}).toPromise();
  }
}

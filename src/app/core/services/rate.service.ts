import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mapRestParams } from '@utils/map-rest-params';

import { Observable } from 'rxjs';

import { Rate, ServerResp } from '@models/interfaces';

import { ApiPath } from '@utils/constants/api-paths';
import { PathBuilder } from '@utils/path-builder';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class RateService {
  private readonly _RATES_BASE_URL = PathBuilder.get(ApiPath.RATES);

  constructor(private readonly _httpClient: HttpClient) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getRates(event: any): Observable<any> {
    const params: HttpParams = mapRestParams(event);

    return this._httpClient.get(this._RATES_BASE_URL, { params });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  save(rate: Rate): Observable<any> {
    const url = this._RATES_BASE_URL + '/save';

    return this._httpClient.post(url, rate, httpOptions);
  }

  update(
    rate: Rate,
    initialExpenseId?: string,
    initialRateAmount?: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Observable<any> {
    const url = this._RATES_BASE_URL + '/update';
    let params: HttpParams = new HttpParams();
    if (initialExpenseId) {
      params = params.append('initialExpenseId', initialExpenseId.toString());
    }
    if (initialRateAmount) {
      params = params.append('initialRateAmount', initialRateAmount.toString());
    }

    return this._httpClient.put(url, rate, { params });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deleteRates(rateIds: number[]): Observable<any> {
    const urlSearchParams: URLSearchParams = new URLSearchParams();
    rateIds.forEach((id) => urlSearchParams.append('', id.toString()));
    const url = this._RATES_BASE_URL + '/delete';

    return this._httpClient.post(url, rateIds);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get(rateId: number): Observable<any> {
    const url = this._RATES_BASE_URL + '/rate/' + rateId;

    return this._httpClient.get(url);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getByName(name: string): Observable<any> {
    const url = this._RATES_BASE_URL + '/name/' + name;

    return this._httpClient.get<Rate>(url);
  }

  getRatesByExpenseId(id: number): Observable<ServerResp<Rate[]>> {
    const url = this._RATES_BASE_URL + '/exp';
    let params: HttpParams = new HttpParams();
    params = params.append('expId', id.toString());

    return this._httpClient.get<ServerResp<Rate[]>>(url, { params });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getRatesByExpenseIds(id: number[], event: any): Observable<any> {
    const url = this._RATES_BASE_URL + '/expenses';
    let params: HttpParams = mapRestParams(event);
    params = params.append('expenseIds', id.toString());

    return this._httpClient.get<Rate[]>(url, { params });
  }
}

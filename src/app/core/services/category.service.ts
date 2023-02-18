import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mapRestParams } from '@utils/map-rest-params';

import { Observable } from 'rxjs';

import { Card, Category, ServerResp } from '@models/interfaces';

import { ApiPath } from '@utils/constants/api-paths';
import { PathBuilder } from '@utils/path-builder';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private CATEGORIES_BASE_URL = PathBuilder.get(ApiPath.CATEGORIES);

  constructor(private readonly _httpClient: HttpClient) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getAll(event: any = {}): Observable<ServerResp<Category>> {
    const params: HttpParams = mapRestParams(event);

    return this._httpClient.get<ServerResp<Category>>(
      this.CATEGORIES_BASE_URL,
      {
        params,
      }
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getCategories(event: any = null): Observable<Category[]> {
    const params: HttpParams = mapRestParams(event);

    return this._httpClient.get<Category[]>(this.CATEGORIES_BASE_URL, {
      params,
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  save(category: Category): Observable<any> {
    const url = this.CATEGORIES_BASE_URL + '/save';

    return this._httpClient.post(url, category, httpOptions);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete(categoryIds: number[], withExpenses: boolean): Observable<any> {
    const params: HttpParams = new HttpParams().append(
      'expenses',
      withExpenses.toString()
    );

    const url = this.CATEGORIES_BASE_URL;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const options: any = {
      body: categoryIds,
      params,
    };

    return this._httpClient.delete<Category[]>(url, options);
  }

  get(catId: number): Observable<Category> {
    const url = this.CATEGORIES_BASE_URL + '/category/' + catId;

    return this._httpClient.get<Category>(url);
  }

  getByName(name: string): Observable<Category> {
    const url = this.CATEGORIES_BASE_URL + '/name/' + name;

    return this._httpClient.get<Category>(url);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  update(category: Category): Observable<any> {
    const url = this.CATEGORIES_BASE_URL + `/update`;

    return this._httpClient.put(url, category, httpOptions);
  }

  getStats(): Observable<Card[]> {
    const url = this.CATEGORIES_BASE_URL + `/info`;

    return this._httpClient.get<Card[]>(url);
  }
}

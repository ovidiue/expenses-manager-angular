import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Card, Category, ServerResp } from '@models/interfaces';

import { ApiPath } from '@utils/constants/api-paths';
import mapTableParams from '@utils/map-rest-params';
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

  getAll(event: any = {}): Observable<ServerResp<Category>> {
    const params: HttpParams = mapTableParams(event);

    return this._httpClient.get<ServerResp<Category>>(
      this.CATEGORIES_BASE_URL,
      {
        params,
      }
    );
  }

  getCategories(event: any = null): Observable<Category[]> {
    const params: HttpParams = mapTableParams(event);

    return this._httpClient.get<Category[]>(this.CATEGORIES_BASE_URL, {
      params,
    });
  }

  save(category: Category): Observable<any> {
    const url = this.CATEGORIES_BASE_URL + '/save';

    return this._httpClient.post(url, category, httpOptions);
  }

  delete(categoryIds: number[], withExpenses: boolean): Observable<any> {
    const params: HttpParams = new HttpParams().append(
      'expenses',
      withExpenses.toString()
    );

    const url = this.CATEGORIES_BASE_URL;
    const options = {
      body: categoryIds,
      params,
    } as any;

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

  nameExists(name: string): Observable<Category> {
    return this.getByName(name);
  }

  update(category: Category): Observable<any> {
    const url = this.CATEGORIES_BASE_URL + `/update`;

    return this._httpClient.put(url, category, httpOptions);
  }

  getStats(): Observable<Card[]> {
    const url = this.CATEGORIES_BASE_URL + `/info`;

    return this._httpClient.get<Card[]>(url);
  }
}

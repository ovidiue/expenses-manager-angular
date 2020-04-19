import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '@models/category';
import { Card } from '@models/interfaces/card';
import { ServerResp } from '@models/interfaces/server-resp';
import { ApiPath } from '@utils/constants/api-paths';
import mapTableParams from '@utils/map-rest-params';
import { PathBuilder } from '@utils/path-builder';
import { LazyLoadEvent } from 'primeng/api';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private CATEGORIES_BASE_URL = PathBuilder.get(ApiPath.CATEGORIES);

  constructor(private http: HttpClient) {}

  getAll(event: LazyLoadEvent = {}): Observable<ServerResp<Category>> {
    const params: HttpParams = mapTableParams(event);

    return this.http.get<ServerResp<Category>>(this.CATEGORIES_BASE_URL, { params });
  }

  getCategories(event: LazyLoadEvent = null): Observable<Category[]> {
    const params: HttpParams = mapTableParams(event);

    return this.http.get<Category[]>(this.CATEGORIES_BASE_URL, { params });
  }

  save(category: Category): Observable<any> {
    const url = this.CATEGORIES_BASE_URL + '/save';

    return this.http.post(url, category, httpOptions);
  }

  delete(categoryIds: number[], withExpenses: boolean): Observable<number[]> {
    let params: HttpParams = new HttpParams();
    params = params.append('withExpenses', withExpenses.toString());
    const url = this.CATEGORIES_BASE_URL + '/delete';

    return this.http.post<number[]>(url, categoryIds, { params });
  }

  get(catId: number): Observable<Category> {
    const url = this.CATEGORIES_BASE_URL + '/' + catId;

    return this.http.get<Category>(url);
  }

  getByName(name: string): Observable<Category> {
    const url = this.CATEGORIES_BASE_URL + '/name/' + name;

    return this.http.get<Category>(url);
  }

  nameExists(name: string): Observable<Category> {
    return this.getByName(name);
  }

  update(category: Category): Observable<any> {
    const url = this.CATEGORIES_BASE_URL + `/update`;

    return this.http.put(url, category, httpOptions);
  }

  getStats(): Observable<Card[]> {
    const url = this.CATEGORIES_BASE_URL + `/info`;

    return this.http.get<Card[]>(url);
  }
}

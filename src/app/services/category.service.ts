import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Category} from '../models/category';
import {LazyLoadEvent} from 'primeng/api';
import mapTableParams from '../utils/MapTableParamsToRest';
import {PathBuilder} from '../utils/PathBuilder';
import {ApiPath} from '../utils/constants/api-paths';
import {Observable} from 'rxjs';
import {ServerResp} from '../models/interfaces';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private CATEGORIES_BASE_URL = PathBuilder.get(ApiPath.CATEGORIES);

  constructor(private http: HttpClient) {
  }

  getAll(event: LazyLoadEvent = {}): Observable<ServerResp<Category>> {
    const params: HttpParams = mapTableParams(event);
    return this.http.get<ServerResp<Category>>(this.CATEGORIES_BASE_URL, {params});
  }

  getCategories(event: LazyLoadEvent = null): Promise<any> {
    const params: HttpParams = mapTableParams(event);
    return this.http.get(this.CATEGORIES_BASE_URL, {params}).toPromise();
  }

  save(category: Category): Promise<any> {
    const url = this.CATEGORIES_BASE_URL + '/save';
    return this.http.post(url, category, httpOptions).toPromise();
  }

  delete(categoryIds: number[], withExpenses: boolean): Observable<any> {
    let params: HttpParams = new HttpParams();
    params = params.append('withExpenses', withExpenses.toString());
    const url = this.CATEGORIES_BASE_URL + '/delete';
    return this.http.post(url, categoryIds, {params});
  }

  get(catId: number): Promise<any> {
    const url = this.CATEGORIES_BASE_URL + '/' + catId;
    return this.http.get<Category>(url).toPromise();
  }

  getByName(name: string): Promise<any> {
    const url = this.CATEGORIES_BASE_URL + '/name/' + name;
    return this.http.get<Category>(url).toPromise();
  }

  nameExists(name: string): Promise<any> {
    return this.getByName(name);
  }

  update(category: Category, id: number): Promise<any> {
    const url = this.CATEGORIES_BASE_URL + `/update/${id}`;
    return this.http.put(url, category, httpOptions).toPromise();
  }

}

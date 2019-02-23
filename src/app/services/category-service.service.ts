import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Category} from '../classes/category';
import {LazyLoadEvent} from 'primeng/api';
import mapTableParams from '../utils/MapTableParamsToRest';
import {PathBuilder} from '../classes/helper/PathBuilder';
import {ApiPath} from '../utils/constants/api-paths';

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

  getCategories(event: LazyLoadEvent): Promise<any> {
    const params: HttpParams = mapTableParams(event);
    return this.http.get(this.CATEGORIES_BASE_URL, {params}).toPromise();
  }

  saveCategory(category: Category): Promise<any> {
    const url = this.CATEGORIES_BASE_URL + '/save';
    return this.http.post(url, category, httpOptions).toPromise();
  }

  deleteCategories(categoryIds: number[], withExpenses: boolean): Promise<any> {
    let params: HttpParams = new HttpParams();
    params = params.append('withExpenses', withExpenses.toString());
    const url = this.CATEGORIES_BASE_URL + '/delete';
    return this.http.post(url, categoryIds, {params}).toPromise();
  }

  getCategory(catId: number): Promise<any> {
    const url = this.CATEGORIES_BASE_URL + '/' + catId;
    return this.http.get<Category>(url).toPromise();
  }

  getCategoryByName(name: string): Promise<any> {
    const url = this.CATEGORIES_BASE_URL + '/name/' + name;
    return this.http.get<Category>(url).toPromise();
  }

  nameExists(name: string): Promise<any> {
    return this.getCategoryByName(name);
  }

  updateCategory(category: Category, id: number): Promise<any> {
    const url = this.CATEGORIES_BASE_URL + `/update/${id}`;
    return this.http.put(url, category, httpOptions).toPromise();
  }

}

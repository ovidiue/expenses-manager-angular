import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Category} from '../classes/category';
import {LazyLoadEvent} from 'primeng/api';
import mapTableParams from '../utils/MapTableParamsToRest';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoriesUrl = 'http://localhost:8080/categories';

  constructor(private http: HttpClient) {
  }

  getCategories(event: LazyLoadEvent): Promise<any> {
    const params: HttpParams = mapTableParams(event);
    return this.http.get(this.categoriesUrl, {params}).toPromise();
  }

  saveCategory(category: Category): Promise<any> {
    const url = this.categoriesUrl + '/save';
    return this.http.post(url, category, httpOptions).toPromise();
  }

  deleteCategories(categoryIds: number[], withExpenses: boolean): Promise<any> {
    let params: HttpParams = new HttpParams();
    params = params.append('withExpenses', withExpenses.toString());
    const url = this.categoriesUrl + '/delete';
    return this.http.post(url, categoryIds, {params}).toPromise();
  }

  getCategory(catId: number): Promise<any> {
    const url = this.categoriesUrl + '/' + catId;
    return this.http.get<Category>(url).toPromise();
  }

  getCategoryByName(name: string): Promise<any> {
    const url = this.categoriesUrl + '/name/' + name;
    return this.http.get<Category>(url).toPromise();
  }

  nameExists(name: string): Promise<any> {
    return this.getCategoryByName(name);
  }

  updateCategory(category: Category, id: number): Promise<any> {
    const url = this.categoriesUrl + `/update/${id}`;
    return this.http.put(url, category, httpOptions).toPromise();
  }

}

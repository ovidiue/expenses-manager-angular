import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from './classes/category';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {
  private categoriesUrl = 'http://localhost:8080/categories';

  constructor(private http: HttpClient) {
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesUrl);
  }

  saveCategory(category: Category): Promise<Category> {
    const url = this.categoriesUrl + '/save';
    return this.http.post(url, category, httpOptions).toPromise().then().catch(err => console.log('err', err));
  }
}

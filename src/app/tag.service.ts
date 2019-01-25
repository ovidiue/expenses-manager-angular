import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Tag} from './classes/tag';
import {Observable} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private tagsUrl = 'http://localhost:8080/tags';

  constructor(private http: HttpClient) {
  }

  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.tagsUrl);
  }

  saveTag(tag: Tag): Promise<any> {
    const url = this.tagsUrl + '/save';
    return this.http.post(url, tag, httpOptions).toPromise().then().catch(err => console.log('err', err));
  }

  deleteTags(tagsIds: number[]): Promise<any> {
    const urlSearchParams: URLSearchParams = new URLSearchParams();
    tagsIds.forEach(id => urlSearchParams.append('', id.toString()));
    const url = this.tagsUrl + '/delete';
    return this.http.post(url, tagsIds).toPromise().then().catch(err => console.log(err));
  }

  getTag(catId: number): Promise<any> {
    const url = this.tagsUrl + '/' + catId;
    return this.http.get<Tag>(url).toPromise();
  }
}

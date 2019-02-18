import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Tag} from '../classes/tag';
import {LazyLoadEvent} from 'primeng/api';
import mapEventToRestParams from '../utils/MapTableParamsToRest';

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

  getTags(event: LazyLoadEvent): Promise<any> {
    const params: HttpParams = mapEventToRestParams(event);
    return this.http.get(this.tagsUrl, {params}).toPromise();
  }

  saveTag(tag: Tag): Promise<any> {
    const url = this.tagsUrl + '/save';
    return this.http.post(url, tag, httpOptions).toPromise();
  }

  deleteTags(tagsIds: Tag[]): Promise<any> {
    const urlSearchParams: URLSearchParams = new URLSearchParams();
    tagsIds.forEach(id => urlSearchParams.append('', id.toString()));
    const url = this.tagsUrl + '/delete';
    return this.http.post(url, tagsIds).toPromise();
  }

  getTag(catId: number): Promise<any> {
    const url = this.tagsUrl + '/' + catId;
    return this.http.get<Tag>(url).toPromise();
  }

  getTagByName(name: string): Promise<any> {
    const url = this.tagsUrl + '/name/' + name;
    return this.http.get<Tag>(url).toPromise();
  }
}

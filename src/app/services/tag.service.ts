import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Tag} from '../models/tag';
import {LazyLoadEvent} from 'primeng/api';
import mapEventToRestParams from '../utils/MapTableParamsToRest';
import {PathBuilder} from '../utils/PathBuilder';
import {ApiPath} from '../utils/constants/api-paths';
import {ServerResp} from '../models/interfaces';
import {Observable} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private TAGS_BASE_URL = PathBuilder.get(ApiPath.TAGS);

  constructor(private http: HttpClient) {
  }

  getAll(event: LazyLoadEvent): Observable<any> {
    let params: HttpParams;
    params = mapEventToRestParams(event);
    return this.http.get<ServerResp<Tag>>(this.TAGS_BASE_URL, {params});
  }

  save(tag: Tag) {
    const url = this.TAGS_BASE_URL + '/save';
    return this.http.post(url, tag, httpOptions);
  }

  delete(tagsIds: Tag[]) {
    const urlSearchParams: URLSearchParams = new URLSearchParams();
    tagsIds.forEach(id => urlSearchParams.append('', id.toString()));
    const url = this.TAGS_BASE_URL + '/delete';
    return this.http.post(url, tagsIds);
  }

  get(catId: number): Observable<Tag> {
    const url = this.TAGS_BASE_URL + '/' + catId;
    return this.http.get<Tag>(url);
  }

  getByName(name: string): Observable<Tag> {
    console.log('getByName', name);
    const url = this.TAGS_BASE_URL + '/name/' + name;
    return this.http.get<Tag>(url);
  }
}

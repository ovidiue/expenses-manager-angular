import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Tag} from '../classes/tag';
import {LazyLoadEvent} from 'primeng/api';
import mapEventToRestParams from '../utils/MapTableParamsToRest';
import {PathBuilder} from '../classes/helper/PathBuilder';
import {ApiPath} from '../utils/constants/api-paths';

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

  getTags(event: LazyLoadEvent): Promise<any> {
    const params: HttpParams = mapEventToRestParams(event);
    return this.http.get(this.TAGS_BASE_URL, {params}).toPromise();
  }

  saveTag(tag: Tag): Promise<any> {
    const url = this.TAGS_BASE_URL + '/save';
    return this.http.post(url, tag, httpOptions).toPromise();
  }

  deleteTags(tagsIds: Tag[]): Promise<any> {
    const urlSearchParams: URLSearchParams = new URLSearchParams();
    tagsIds.forEach(id => urlSearchParams.append('', id.toString()));
    const url = this.TAGS_BASE_URL + '/delete';
    return this.http.post(url, tagsIds).toPromise();
  }

  getTag(catId: number): Promise<any> {
    const url = this.TAGS_BASE_URL + '/' + catId;
    return this.http.get<Tag>(url).toPromise();
  }

  getTagByName(name: string): Promise<any> {
    const url = this.TAGS_BASE_URL + '/name/' + name;
    return this.http.get<Tag>(url).toPromise();
  }
}

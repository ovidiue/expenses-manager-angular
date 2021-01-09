import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Card, ServerResp, Tag } from '@models/interfaces';
import { ApiPath } from '@utils/constants/api-paths';
import mapEventToRestParams from '@utils/map-rest-params';
import { PathBuilder } from '@utils/path-builder';
import { LazyLoadEvent } from 'primeng/api';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class TagService {
  private TAGS_BASE_URL = PathBuilder.get(ApiPath.TAGS);

  constructor(private http: HttpClient) {}

  getAll(event: LazyLoadEvent): Observable<ServerResp<Tag>> {
    let params: HttpParams;
    params = mapEventToRestParams(event);

    return this.http.get<ServerResp<Tag>>(this.TAGS_BASE_URL, { params });
  }

  save(tag: Tag) {
    const url = this.TAGS_BASE_URL + '/save';

    return this.http.post(url, tag, httpOptions);
  }

  //TODO change implementation by sending ids
  delete(tags: Tag[]) {
    const url = this.TAGS_BASE_URL + '/delete';
    const options = { body: tags };

    return this.http.delete(url, options as any);
  }

  get(catId: number): Observable<Tag> {
    const url = this.TAGS_BASE_URL + '/' + catId;

    return this.http.get<Tag>(url);
  }

  getByName(name: string): Observable<Tag> {
    const url = this.TAGS_BASE_URL + '/name/' + name;

    return this.http.get<Tag>(url);
  }

  getStats(): Observable<Card[]> {
    const url = this.TAGS_BASE_URL + '/tag-info';

    return this.http.get<Card[]>(url);
  }

  update(tag: Tag) {
    const url = this.TAGS_BASE_URL;

    return this.http.put(url, tag, httpOptions);
  }
}

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mapRestParams } from '@utils/map-rest-params';

import { Observable } from 'rxjs';

import { Card, ServerResp, Tag } from '@models/interfaces';

import { ApiPath } from '@utils/constants/api-paths';
import { PathBuilder } from '@utils/path-builder';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class TagService {
  private readonly _TAGS_BASE_URL = PathBuilder.get(ApiPath.TAGS);

  constructor(private readonly _httpClient: HttpClient) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getAll(event: any): Observable<ServerResp<Tag>> {
    const params: HttpParams = mapRestParams(event);

    return this._httpClient.get<ServerResp<Tag>>(this._TAGS_BASE_URL, {
      params,
    });
  }

  save(tag: Tag) {
    const url = this._TAGS_BASE_URL + '/save';

    return this._httpClient.post(url, tag, httpOptions);
  }

  // TODO change implementation by sending ids
  delete(tags: Tag[]) {
    const url = this._TAGS_BASE_URL + '/delete';
    const options = { body: tags };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this._httpClient.delete(url, options as any);
  }

  get(catId: number): Observable<Tag> {
    const url = this._TAGS_BASE_URL + '/' + catId;

    return this._httpClient.get<Tag>(url);
  }

  getByName(name: string): Observable<Tag> {
    const url = this._TAGS_BASE_URL + '/name/' + name;

    return this._httpClient.get<Tag>(url);
  }

  getStats(): Observable<Card[]> {
    const url = this._TAGS_BASE_URL + '/tag-info';

    return this._httpClient.get<Card[]>(url);
  }

  update(tag: Tag) {
    const url = this._TAGS_BASE_URL;

    return this._httpClient.put(url, tag, httpOptions);
  }
}

import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';

import { Tag } from '@models/interfaces';

import { TagService } from '@core/services';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class TagFacade {
  private _loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  private _loadingMessage = new BehaviorSubject<string>('');
  private _tags: BehaviorSubject<Tag[]> = new BehaviorSubject([]);
  private _total: BehaviorSubject<Number> = new BehaviorSubject(0);
  private event: any;

  constructor(
    private readonly _tagService: TagService,
    private readonly _toastrService: ToastrService
  ) {
    this.getTags(null);
  }

  get loading$() {
    return this._loading.asObservable();
  }

  get tags$() {
    return this._tags.asObservable();
  }

  get total$() {
    return this._total.asObservable();
  }

  getTag(id: number) {
    this.setLoading(true);

    return this._tagService.get(id).pipe(
      catchError((err: HttpErrorResponse) => {
        this._toastrService.error(err.message, 'Failed fetching tag');

        return throwError(err);
      }),
      finalize(() => {
        this.setLoading(false);
      })
    );
  }

  getTagByName(name: string): Observable<Tag> {
    return this._tagService.getByName(name).pipe(
      catchError((err: HttpErrorResponse) => {
        this._toastrService.error(err.message, 'Failed fetching tag');

        return throwError(err);
      })
    );
  }

  saveTag(tag: Tag) {
    this.setLoading(true);

    return this._tagService.save(tag).pipe(
      catchError((err: HttpErrorResponse) => {
        this._toastrService.error(err.message, 'Failed saving tag');

        return throwError(err);
      }),
      tap((resp) => {
        this._toastrService.success('', 'Saved tag');
      }),
      finalize(() => {
        this.setLoading(false);
      })
    );
  }

  update(tag: Tag) {
    this.setLoading(true);

    return this._tagService.update(tag).pipe(
      catchError((err: HttpErrorResponse) => {
        this._toastrService.error(err.message, 'Failed updating tag');

        return throwError(err);
      }),
      tap((resp) => {
        this._toastrService.success('', 'Updated tag');
      }),
      finalize(() => {
        this.setLoading(false);
      })
    );
  }

  isSameEvent(event: any): boolean {
    return _.isEqual(event, this.event);
  }

  deleteTags(tags: Tag[]) {
    const stringForm = tags.length > 1 ? 'tags' : 'tag';
    this.setLoading(true);

    return this._tagService.delete(tags).pipe(
      catchError((err: HttpErrorResponse) => {
        this._toastrService.error('Failed deleting', 'Delete');

        return throwError(err);
      }),
      tap(() => {
        this._toastrService.success(`Successfully deleted ${stringForm}`);
      }),
      finalize(() => {
        this.setLoading(false);
      })
    );
  }

  getTags(event: any) {
    this.setLoading(true);
    this._tagService
      .getAll(event)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this._toastrService.error('Error getting tags', 'Error');

          return throwError(err);
        }),
        finalize(() => {
          this.setLoading(false);
        })
      )
      .subscribe((resp) => {
        this._tags.next(resp.data);
        this._total.next(resp.total);
      });
  }

  private setLoading(state: boolean): void {
    this._loading.next(state);
  }
}

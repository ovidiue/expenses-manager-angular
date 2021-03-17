import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';

import { LazyLoadEvent } from 'primeng/api';

import { Tag } from '@models/interfaces';

import { MESSAGES } from '@utils/messages';

import { TagService } from '@core/services';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class TagFacade {
  private _loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  private _loadingMessage = new BehaviorSubject<string>('');
  private _tags: BehaviorSubject<Tag[]> = new BehaviorSubject([]);
  private _total: BehaviorSubject<Number> = new BehaviorSubject(0);
  private event: LazyLoadEvent;

  constructor(
    private tagService: TagService,
    private readonly toastr: ToastrService
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

    return this.tagService.get(id).pipe(
      catchError((err: HttpErrorResponse) => {
        this.toastr.error(err.message, 'Failed fetching tag');

        return throwError(err);
      }),
      finalize(() => {
        this.setLoading(false);
      })
    );
  }

  getTagByName(name: string): Observable<Tag> {
    return this.tagService.getByName(name).pipe(
      catchError((err: HttpErrorResponse) => {
        this.toastr.error(err.message, 'Failed fetching tag');

        return throwError(err);
      })
    );
  }

  saveTag(tag: Tag) {
    this.setLoading(true);

    return this.tagService.save(tag).pipe(
      catchError((err: HttpErrorResponse) => {
        this.toastr.error(err.message, 'Failed saving tag');

        return throwError(err);
      }),
      tap((resp) => {
        this.toastr.success('', 'Saved tag');
      }),
      finalize(() => {
        this.setLoading(false);
      })
    );
  }

  update(tag: Tag) {
    this.setLoading(true);

    return this.tagService.update(tag).pipe(
      catchError((err: HttpErrorResponse) => {
        this.toastr.error(err.message, 'Failed updating tag');

        return throwError(err);
      }),
      tap((resp) => {
        this.toastr.success('', 'Updated tag');
      }),
      finalize(() => {
        this.setLoading(false);
      })
    );
  }

  isSameEvent(event: LazyLoadEvent): boolean {
    return _.isEqual(event, this.event);
  }

  deleteTags(tags: Tag[]) {
    const stringForm = tags.length > 1 ? 'tags' : 'tag';
    this.setLoading(true);

    return this.tagService
      .delete(tags)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.toastr.error('Failed deleting', 'Delete');

          return throwError(err);
        }),
        tap(() => {
          this.toastr.success(`Successfully deleted ${stringForm}`);
        }),
        finalize(() => {
          this.setLoading(false);
        })
      )
      .subscribe(
        () => {
          let tags = this._tags.getValue();
          tags = tags.filter((tag) => !tags.includes(tag));
          const updatedTotal =
            parseInt(this._total.getValue().toFixed(), 10) - 1;
          this._total.next(updatedTotal);
          this._tags.next(tags);
        },
        () => this.toastr.error(MESSAGES.ERROR)
      );
  }

  getTags(event: LazyLoadEvent) {
    this.setLoading(true);
    this.tagService
      .getAll(event)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.toastr.error('Error getting tags', 'Error');

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

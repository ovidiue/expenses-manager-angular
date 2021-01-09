import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TagService } from '@core/services';
import { Tag } from '@models/interfaces';
import { MESSAGES } from '@utils/messages';
import { TABLE_DEFAULTS } from '@utils/table-options';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { LazyLoadEvent } from 'primeng/api';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';

@Injectable()
export class TagDataService {
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
    this.loadInitialData(TABLE_DEFAULTS.query);
  }

  getTag(id: number) {
    this.setLoading(true);
    this.setLoadingMessage(`Fetching tag with id ${id}`);

    return this.tagService.get(id).pipe(
      catchError((err: HttpErrorResponse) => {
        this.toastr.error(err.message, 'Failed fetching tag');

        return throwError(err);
      }),
      finalize(() => {
        this.setLoading(false);
        this.clearLoadingMessage();
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
    this.setLoadingMessage(`Saving tag ${tag.name}`);

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
        this.clearLoadingMessage();
      })
    );
  }

  update(tag: Tag) {
    this.setLoading(true);
    this.setLoadingMessage(`Updating tag ${tag.name}`);

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
        this.clearLoadingMessage();
      })
    );
  }

  public getLoadingState(): Observable<boolean> {
    return this._loading.asObservable();
  }

  public getLoadingMessage(): Observable<string> {
    return this._loadingMessage.asObservable();
  }

  isSameEvent(event: LazyLoadEvent): boolean {
    return _.isEqual(event, this.event);
  }

  deleteTags(tags: Tag[]) {
    const stringForm = tags.length > 1 ? 'tags' : 'tag';
    this.setLoading(true);
    this.setLoadingMessage(`Deleting ${stringForm}`);

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
          this.clearLoadingMessage();
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

  public getTags(event: LazyLoadEvent): Observable<any> {
    if (!this.isSameEvent(event)) {
      this.event = event;
      this.loadInitialData(event);
    }

    return this._tags.asObservable();
  }

  public getTotal(): Observable<any> {
    return this._total.asObservable();
  }

  private setLoadingMessage(value: string) {
    this._loadingMessage.next(value);
  }

  private clearLoadingMessage() {
    this.setLoadingMessage('');
  }

  private setLoading(state: boolean): void {
    this._loading.next(state);
  }

  private loadInitialData(event: LazyLoadEvent) {
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
}

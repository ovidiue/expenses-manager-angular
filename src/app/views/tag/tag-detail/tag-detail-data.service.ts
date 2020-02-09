import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tag } from '@models/tag';
import { TagService } from '@services/tag.service';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TagDetailDataService {
  private _loading = new BehaviorSubject<boolean>(false);

  constructor(
    private tagService: TagService,
    private readonly toastr: ToastrService
  ) {
  }

  getTag(id: number) {
    this.setLoading(true);

    return this.tagService.get(id)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.toastr.error(err.message, 'Failed fetching tag');

          return throwError(err);
        }),
        finalize(() => this.setLoading(false))
      );
  }

  getTagByName(name: string): Observable<Tag> {
    this.setLoading(true);

    return this.tagService.getByName(name)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.toastr.error(err.message, 'Failed fetching tag');

          return throwError(err);
        }),
        finalize(() => this.setLoading(false))
      );
  }

  saveTag(tag: Tag) {
    this.setLoading(true);

    return this.tagService.save(tag)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.toastr.error(err.message, 'Failed saving tag');

          return throwError(err);
        }),
        tap(resp => {
          this.toastr.success('', 'Saved tag');
        }),
        finalize(() => this.setLoading(false)));
  }

  update(tag: Tag) {
    this.setLoading(true);

    return this.tagService.update(tag)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.toastr.error(err.message, 'Failed updating tag');

          return throwError(err);
        }),
        tap(resp => {
          this.toastr.success('', 'Updated tag');
        }),
        finalize(() => this.setLoading(false)));
  }

  public getLoadingState(): Observable<boolean> {
    return this._loading.asObservable();
  }

  private setLoading(state: boolean): void {
    this._loading.next(state);
  }
}

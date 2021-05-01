import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from '@core/services';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private readonly _authService: AuthService,
    private readonly _toastrService: ToastrService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.error.message === 'Unauthorized') {
          this._toastrService.clear();
          this._toastrService
            .warning('You have been loggedOut', 'Session ended', {
              closeButton: true,
              progressBar: false,
              disableTimeOut: true,
            })
            .onTap.subscribe((a) => {
              // TODO fix session ended notification keep showing up
              this._authService.logout();
              this._toastrService.clear();
            });
        }

        return throwError(err);
      })
    );
  }
}

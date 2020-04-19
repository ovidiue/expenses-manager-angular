import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@core/services';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private readonly authService: AuthService, private readonly toastr: ToastrService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.error.message === 'Unauthorized') {
            this.toastr.warning('You have been loggedOut', 'Session ended', {
              closeButton: true,
              progressBar: false,
              disableTimeOut: true
            }).onHidden.subscribe((a) => {
              this.authService.logout();
            });
          }

          return throwError(err);
        })
      );
  }

}

import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginService } from '../views/login/login.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private readonly authService: LoginService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          console.log('err', err);
          if (err.error.message === 'Unauthorized') {
            this.authService.logout();
          }

          return throwError(err);
        })
      );
  }

}

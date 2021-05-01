import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';

import { ApiPath } from '@utils/constants/api-paths';
import { PathBuilder } from '@utils/path-builder';

import { ToastrService } from 'ngx-toastr';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _AUTHENTICATE_BASE_URL = PathBuilder.get(
    ApiPath.AUTHENTICATE
  );
  private readonly _REGISTER_BASE_URL = PathBuilder.get(ApiPath.REGISTER);
  private readonly _isLoading$ = new BehaviorSubject<boolean>(false);
  private readonly _isLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _router: Router,
    private readonly _toastrService: ToastrService
  ) {}

  public getLoadingState(): Observable<boolean> {
    return this._isLoading$.asObservable();
  }

  register(username: string, password: string) {
    this.setLoading(true);

    return this._httpClient
      .post(this._REGISTER_BASE_URL, { username, password }, httpOptions)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this._toastrService.error(err.message, 'Register Failed');

          return throwError(err);
        }),
        finalize(() => {
          this.setLoading(false);
        })
      )
      .subscribe(() => {
        this._isLoggedIn$.next(true);
        this._toastrService.success('Register Success');
        this._router.navigate(['/home']);
      });
  }

  authenticate(username: string, password: string) {
    this.setLoading(true);

    return this._httpClient
      .post(this._AUTHENTICATE_BASE_URL, { username, password }, httpOptions)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this._toastrService.error(err.message, 'Login Failed');

          return throwError(err);
        }),
        tap((resp: { [token: string]: string }) =>
          localStorage.setItem('token', resp.token)
        ),
        finalize(() => {
          this.setLoading(false);
        })
      )
      .subscribe(() => {
        this._isLoggedIn$.next(true);
        this._toastrService.success('Success logged in');
        this._router.navigate(['/home']);
      });
  }

  public getLoggedInStatus() {
    // TODO find better solution
    const token = localStorage.getItem('token');
    this._isLoggedIn$.next(token !== null);

    return this._isLoggedIn$.asObservable();
  }

  logout() {
    this._isLoggedIn$.next(false);
    localStorage.removeItem('token');
    this._router.navigate(['login']);
  }

  private setLoading(state: boolean) {
    this._isLoading$.next(state);
  }
}

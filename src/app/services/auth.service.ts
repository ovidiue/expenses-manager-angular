import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { PathBuilder } from '@utils/path-builder';
import { ApiPath } from '@utils/constants/api-paths';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { catchError, finalize, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({providedIn: 'root'})
export class AuthService {
  private AUTHENTICATE_BASE_URL = PathBuilder.get(ApiPath.AUTHENTICATE);
  private REGISTER_BASE_URL = PathBuilder.get(ApiPath.REGISTER);
  private isLoading$ = new BehaviorSubject<boolean>(false);
  private isLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private readonly router: Router,
    private readonly toastr: ToastrService
  ) {
  }

  public getLoadingState(): Observable<boolean> {
    return this.isLoading$.asObservable();
  }

  register(username: string, password: string) {
    this.setLoading(true);
    return this.http.post(this.REGISTER_BASE_URL, {username, password}, httpOptions)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.toastr.error(err.message, 'Register Failed');
          return throwError(err);
        }),
        finalize(() => {
          this.setLoading(false);
        })
      )
      .subscribe(() => {
        this.isLoggedIn$.next(true);
        this.toastr.success('Register Success');
        this.router.navigate(['expenses']);
      });
  }

  authenticate(username: string, password: string) {
    this.setLoading(true);
    return this.http.post(this.AUTHENTICATE_BASE_URL, {username, password}, httpOptions)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.toastr.error(err.message, 'Login Failed');
          return throwError(err);
        }),
        tap((resp: { [token: string]: string }) => localStorage.setItem('token', resp.token)),
        finalize(() => {
          this.setLoading(false);
        })
      )
      .subscribe(() => {
        this.isLoggedIn$.next(true);
        this.toastr.success('Success logged in');
        this.router.navigate(['expenses']);
      });
  }

  public getLoggedInStatus() {
    return this.isLoggedIn$.asObservable();
  }

  logout() {
    this.isLoggedIn$.next(false);
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  private setLoading(state: boolean) {
    this.isLoading$.next(state);
  }

}

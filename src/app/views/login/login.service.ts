import { Injectable } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private isLoading$ = new BehaviorSubject<boolean>(false);
  private isLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly service: AuthService,
    private readonly router: Router,
    private readonly toastr: ToastrService
  ) {
  }

  public getLoadingState(): Observable<boolean> {
    return this.isLoading$.asObservable();
  }

  register(username: string, password: string) {
    this.setLoading(true);
    this.service.register(username, password)
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
    this.service.authenticate(username, password)
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

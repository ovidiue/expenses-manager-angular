import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { PathBuilder } from '@utils/path-builder';
import { ApiPath } from '@utils/constants/api-paths';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({providedIn: 'root'})
export class AuthService {
  private AUTHENTICATE_BASE_URL = PathBuilder.get(ApiPath.AUTHENTICATE);
  private REGISTER_BASE_URL = PathBuilder.get(ApiPath.REGISTER);

  constructor(private http: HttpClient, private readonly router: Router) {
  }

  register(username: string, password: string) {
    return this.http.post(this.REGISTER_BASE_URL, {username, password}, httpOptions);
  }

  authenticate(username: string, password: string) {
    return this.http.post(this.AUTHENTICATE_BASE_URL, {username, password}, httpOptions);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}

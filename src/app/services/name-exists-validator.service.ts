import {Injectable, Input} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {AbstractControl, ValidationErrors} from '@angular/forms';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NameExistsValidatorService {
  @Input() endpoint: string;

  constructor(private http: HttpClient) {
  }

  nameExists(control: AbstractControl): Observable<ValidationErrors> {
    let params: HttpParams = new HttpParams();
    params = params.append('name', control.value);
    return this.http.get(this.endpoint, {params});
  }
}

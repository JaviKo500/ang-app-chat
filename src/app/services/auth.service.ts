import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment.prod';

// Models
import { UserModel } from '../models/user.model';
import { LogInResponse } from '../models/login-response.model';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _baseUrl: string = environment.BASE_URL; 
  private _user?:UserModel;
  private _token?: string;
  private _isAuthenticated: boolean = false;

  constructor(
    private _http: HttpClient
  ) { }

  get userLoggedIn(): UserModel {
    return this._user!;
  } 
  get isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  set isAuthenticated( value: boolean ) {
    this._isAuthenticated = value;
  }

  public get getToken(): string | null  {
    if ( this._token != null ) {
      return this._token;
    } else if ( sessionStorage.getItem( 'token') != null ){
      return this._token = sessionStorage.getItem( 'token')!;
    }
    return null;
  }

  logIn = ( email: string, password: string ) => {
    let body = { email, password };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });    
    return this._http.post<LogInResponse>(`${this._baseUrl}/login`, body, {headers})
      .pipe(
        tap( (response: LogInResponse) => {
          if ( response.ok ){
            this.saveToken(response.token);
            this._token = response.token;
          }
        }),
        map( (response: LogInResponse) => response.ok ),
        catchError( (err) => of(err.error.msg))
      );

  } 
  logOut = (): void => {
    this._user = undefined;
    this._token = undefined;
    sessionStorage.removeItem('token');
  }

  validateToken = (): Observable<boolean> =>{
    const headers = new HttpHeaders().set('x-token', this.getToken || '');
    return this._http.get<LogInResponse>(`${this._baseUrl}/login/renew`, {headers})
      .pipe(
        map( (response :LogInResponse) => {
          this.saveToken( response.token );
          this._user = response.user;
          this.isAuthenticated = response.ok;
          return response.ok;
        }),
        catchError( err => of( false ))
      )
  }

  saveToken = ( token: string ) => {
    this._token = token;
    sessionStorage.setItem('token', this._token);
  }
}

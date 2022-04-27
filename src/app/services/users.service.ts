import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { UsersResponse } from '../models/users-response.model';
import { tap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private _baseUrl: string = environment.BASE_URL;
  private _users: UserModel [] = [];
  constructor(
    private _http: HttpClient
  ) { }

  get users (): UserModel[] {
    return this._users;
  }

  getUsers = () => {
    return this._http.get<UsersResponse>(`${this._baseUrl}/users`)
      .pipe(
        tap( (resp: UsersResponse) => {
          if ( resp.ok ) {
            this._users = resp.users;
          }
        }),
        map( (resp: UsersResponse) => resp.ok),
        catchError( (err) => of(err.error.msg))
      )
  }
}

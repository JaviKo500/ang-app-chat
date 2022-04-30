import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { MessageResponse } from '../models/message_response.model';
import { map, catchError, tap } from 'rxjs/operators';
import { MessageModel } from '../models/message.model';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private _baseUrl = environment.BASE_URL;

  private _messages?: MessageModel [];

  get messages() {
    return this._messages;
  }
  constructor(
    private _http: HttpClient
  ) { }

  getChat = ( userId: string ) => {
    return this._http.get<MessageResponse>(`${this._baseUrl}/messages/${userId}`)
      .pipe(
        tap( (resp: MessageResponse) => {
          if ( resp.ok ) {
            // this._messages = [];
            this._messages = resp.messages;
          }
        }),
        map( (resp: MessageResponse) => resp.ok ),
        catchError( err => of(err.error.msg))
      )
  }
}

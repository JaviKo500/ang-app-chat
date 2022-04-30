import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { AuthService } from './auth.service';
import { NewMessage } from '../models/new_message.model';
import  { io }  from 'socket.io-client';
import { Socket } from 'ngx-socket-io';
import { url } from 'inspector';


@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private _socket?: Socket;

  public message$: BehaviorSubject<NewMessage> = new BehaviorSubject({});

  constructor(
    private _authService: AuthService,
    // private _socket: Socket
  ) {
  }



  connect = () => {
    this._socket = new Socket({url: environment.BASE_URL_SOCKET, options: {
      transports: ["websocket"],
      autoConnect: true,
      forceNew: true,
      query: {
        'x-token': this._authService.getToken
      }
    }});
  }
  
  userConnect = () => {
    this._socket?.emit('user-connect');
  }
  onUserConnect = () => {
    return this._socket?.fromEvent('user-connect');
  }

  sendMessage = ( message: NewMessage ) => {    
    this._socket?.emit( 'personal-message' , {
      from: message.from,
      to: message.to,
      message: message.message
    });
  }

  getNewMessage = () => {
    this._socket?.on( 'personal-message', ( message: NewMessage ) => {
      this.message$?.next(message);
    } )
    return this.message$?.asObservable();
  }

  disconnect = () => {
    this._socket?.disconnect();
  }
  
}


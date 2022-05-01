import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SocketService } from '../../../services/socket.service';
import { AuthService } from '../../../services/auth.service';
import { MessageService } from '../../../services/message.service';
import { ActivatedRoute } from '@angular/router';
import { MessageModel } from '../../../models/message.model';
import { UserModel } from '../../../models/user.model';
import { UsersService } from '../../../services/users.service';
import { NewMessage } from '../../../models/new_message.model';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-user-message',
  templateUrl: './user-message.component.html',
  styleUrls: ['./user-message.component.css']
})
export class UserMessageComponent implements OnInit {

  @ViewChild('final') final?: ElementRef;

  public newTextMessage: string = '';
  public messages: MessageModel [] = [];

  public userLoggedIn?: UserModel;
  public userTo?: UserModel;
  constructor(
    private _activatedRouter: ActivatedRoute,
    private _authService: AuthService,
    private _messageService: MessageService,
    private _socketService: SocketService,
    private _userService: UsersService
  ) { }

  ngOnInit(): void {
    this.userLoggedIn = this._authService.userLoggedIn;
    this.listenMessage();
    this.getUserIdParam();
    this.final?.nativeElement.scrollIntoView(true);
    
  }

  getChatClass = ( uid: string ) => uid === this._authService.userLoggedIn?.uid ? 'right' : 'left';

  getIconTextChat = ( uid: string ): string => uid === this.userLoggedIn?.uid 
  ? this.getIconText(this.userLoggedIn.name) 
  : this.getIconText(this.userTo?.name!);

  getIconText = ( name: string ): string => name?.substring(0,2).toLocaleUpperCase();

  getUserIdParam = () => {
    this._activatedRouter.paramMap.subscribe( (params) => {
      let userId = params.get('id') ?? null; 
      if ( userId ) {
        this.getUserChat( userId ); 
        this.getChat( userId );
      }
      return;
    });
  }

  getUserChat = ( userId:string ) => {
    this._userService.getUserById( userId )
      .subscribe( user => {
        if (user) {          
          this.userTo = user;
        }
      }, error => console.log);
  }

  getChat = ( userId: string ) => {
    this._messageService.getChat( userId )
      .subscribe( (ok) => {
        this.messages = [];
        if ( ok === true ) {
          this.messages = this._messageService.messages?.reverse()!; 
          this.final?.nativeElement.scrollIntoView(true);         
        } else {
          console.log(ok);
        }
      }, error => console.log);
  }
  
  

  listenMessage = () => {
    this._socketService.getNewMessage()
      .subscribe( (msg: NewMessage) => {
        if ( msg.from && msg.to ) {
          let newMessage: MessageModel = {from: msg.from, to: msg.to,  message: msg.message};
          this.messages.push( newMessage );
          this.final?.nativeElement.scrollIntoView(true);
          // this.panel?.nativeElement.scrollIntoView(true);
        }
      }, error => console.log );
  }

  sendNewMessage = () => {
    if(  this.newTextMessage.trim().length === 0 ) return;
    let message: MessageModel = { 
      from: this._authService.userLoggedIn.uid!,
      to: this.userTo?.uid!,
      message: this.newTextMessage
    };
    this.messages.push(message);
    this._socketService.sendMessage( message );
    this.final?.nativeElement.scrollIntoView(true);
    this.newTextMessage = '';
  }


}

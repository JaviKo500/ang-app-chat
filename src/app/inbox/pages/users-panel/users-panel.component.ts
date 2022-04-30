import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { UserModel } from '../../../models/user.model';
import { UsersService } from '../../../services/users.service';
import { SocketService } from '../../../services/socket.service';

@Component({
  selector: 'app-users-panel',
  templateUrl: './users-panel.component.html',
  styleUrls: ['./users-panel.component.css']
})
export class UsersPanelComponent implements OnInit {
  public userLoggedIn?: UserModel;
  public users: UserModel [] = [];
  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _socketService: SocketService,
    private _usersService: UsersService,
  ) { }

  ngOnInit(): void {
    this.userLoggedIn = this._authService.userLoggedIn;
    this._socketService.onUserConnect()
      ?.subscribe( res => {        
        this.getUsers();
      });
  }

  getIconText = (): string => this.userLoggedIn?.name.substring(0,2).toLocaleUpperCase()!;
  
  getUsers = () => {
    this.users = [];
    this._usersService.getUsers()
      .subscribe( ok => {        
        if ( ok === true ){
          this.users = this._usersService.users;          
        } else {
          console.log(ok);
        }
      }, error => {
        console.log(error);
      })
  }
  logOut = (): void => {
    this._authService.logOut();
    this._socketService.userConnect();
    this._socketService.disconnect();
    this._router.navigateByUrl('/auth');
  }

}

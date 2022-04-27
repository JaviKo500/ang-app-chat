import { Component, Input, OnInit } from '@angular/core';
import { UserModel } from '../../../models/user.model';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {
  @Input() user?: UserModel;
  constructor() { }

  ngOnInit(): void {
  }
  getIconText = (): string => this.user?.name.substring(0,2).toLocaleUpperCase()!;
  getClassUserState = (): string => this.user?.online ? 'connect': 'disconnect';

}

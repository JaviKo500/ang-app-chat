import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../../services/socket.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(
    private _socketService: SocketService,
  ) { }

  ngOnInit(): void {
    this._socketService.connect();
    this._socketService.userConnect();
  }

}

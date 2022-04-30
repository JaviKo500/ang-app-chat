import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
// Modules
import { InboxRoutingModule } from './inbox-routing.module';
import { PrimengModule } from '../primeng/primeng.module';

// Components
import { MainComponent } from './pages/main/main.component';
import { EmptyChatComponent } from './components/empty-chat/empty-chat.component';
import { HomeMessageComponent } from './components/home-message/home-message.component';
import { MessagesPanelComponent } from './pages/messages-panel/messages-panel.component';
import { UsersPanelComponent } from './pages/users-panel/users-panel.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { UserMessageComponent } from './components/user-message/user-message.component';



@NgModule({
  declarations: [MainComponent, UsersPanelComponent, MessagesPanelComponent, UserCardComponent, HomeMessageComponent, UserMessageComponent, EmptyChatComponent],
  imports: [
    CommonModule,
    FormsModule,
    InboxRoutingModule,
    PrimengModule,
    SocketIoModule,
  ]
})
export class InboxModule { }

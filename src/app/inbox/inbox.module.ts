import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { InboxRoutingModule } from './inbox-routing.module';
import { PrimengModule } from '../primeng/primeng.module';

// Components
import { MainComponent } from './pages/main/main.component';
import { UsersPanelComponent } from './pages/users-panel/users-panel.component';
import { MessagesPanelComponent } from './pages/messages-panel/messages-panel.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { HomeMessageComponent } from './components/home-message/home-message.component';
import { UserMessageComponent } from './components/user-message/user-message.component';

@NgModule({
  declarations: [MainComponent, UsersPanelComponent, MessagesPanelComponent, UserCardComponent, HomeMessageComponent, UserMessageComponent],
  imports: [
    CommonModule,
    InboxRoutingModule,
    PrimengModule,
  ]
})
export class InboxModule { }

import { NgModule } from '@angular/core';

import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ToastModule } from 'primeng/toast';
@NgModule({
  exports: [
    AvatarModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    ScrollPanelModule,
    ToastModule,
  ]
})
export class PrimengModule { }

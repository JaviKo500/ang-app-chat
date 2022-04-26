import { NgModule } from '@angular/core';

import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ScrollPanelModule } from 'primeng/scrollpanel';
@NgModule({
  exports: [
    ButtonModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    ScrollPanelModule,
    AvatarModule,
  ]
})
export class PrimengModule { }

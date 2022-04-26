import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Modules
import { AuthRoutingModule } from './auth-routing.module';
import { PrimengModule } from '../primeng/primeng.module';

// Components
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { RegisterComponent } from './pages/register/register.component';


@NgModule({
  declarations: [
    LoginComponent, 
    MainComponent,
    RegisterComponent, 
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
    PrimengModule,
  ]
})
export class AuthModule { }

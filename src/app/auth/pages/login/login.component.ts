import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../services/auth.service';
import { UserMessageFormService } from '../../services/user-message-form.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  public logInForm: FormGroup = this._formBuilder.group({
    email: [ , [Validators.required, Validators.pattern(this.userMsgFormService.emailPattern)] ],
    password: [ , [Validators.required, Validators.minLength(6)] ]
  });
  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _messageService: MessageService,
    private _authService: AuthService,
    public userMsgFormService: UserMessageFormService,
  ) {
    this.userMsgFormService.form = this.logInForm;
  }

  ngOnInit(): void {
  }

  logIn =  () => {
    if ( this.logInForm.valid ) {
      let { email, password } = this.logInForm.value;
      this._authService.logIn( email, password )
        .subscribe( ok => {
          if( ok === true ){
            this._router.navigate(['/inbox']);
          } else {
            this._messageService.add({key: 'tc', severity:'warn', summary: 'Upss!', detail: 'Invalid Email or Password', life: 2000});
            this._authService.logOut();
          }
        });
    }
    this.logInForm.markAllAsTouched();
  }

  

  

}

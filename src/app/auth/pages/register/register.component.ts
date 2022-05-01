import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from '../../../models/user.model';
import { AuthService } from '../../../services/auth.service';
import { MessageService } from 'primeng/api';
import { UserMessageFormService } from '../../services/user-message-form.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MessageService]
})
export class RegisterComponent implements OnInit {
  
  public registerForm: FormGroup = this._formBuilder.group({
    name: [ , [Validators.required, Validators.pattern(this.userMsgFormService.namePattern)] ],
    email: [ , [Validators.required, Validators.pattern(this.userMsgFormService.emailPattern)] ],
    password: [ , [Validators.required, Validators.minLength(6)] ],
  });
  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _messageService: MessageService,
    private _authService: AuthService,
    public userMsgFormService: UserMessageFormService,
  ) {
    this.userMsgFormService.form = this.registerForm;
  }

  ngOnInit(): void {
  }

  createUser = () => {
    if ( this.registerForm.valid ) {
      let user: UserModel = this.registerForm.value;
      this._authService.createUser( user )
        .subscribe( ok => {
          if ( ok === true ) {
            this._router.navigate(['/inbox']);
          } else {
            this._messageService.add({key: 'tc', severity:'warn', summary: 'Upss!', detail: ok, life: 2000});
            this._authService.logOut();
          }
        });
    }

    this.registerForm.markAllAsTouched();
  }

}

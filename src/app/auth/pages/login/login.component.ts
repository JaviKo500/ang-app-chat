import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public logInForm: FormGroup = this._formBuilder.group({
    email: [ , [Validators.required] ],
    password: [ , [Validators.required] ]
  });
  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _authService: AuthService,
  ) { }

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
            console.log(ok);
            
            this._authService.logOut();
          }
        });
    }
  }

  

  

}

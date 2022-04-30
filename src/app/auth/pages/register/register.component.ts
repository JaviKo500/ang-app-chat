import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from '../../../models/user.model';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  public registerForm: FormGroup = this._formBuilder.group({
    name: [ , [Validators.required] ],
    email: [ , [Validators.required] ],
    password: [ , [Validators.required] ],
  });
  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _authService: AuthService,
  ) { }

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
            console.log(ok);
            
            this._authService.logOut();
          }
        }, error => {
          console.log(error);
          this._authService.logOut();
        });
    }
  }

}

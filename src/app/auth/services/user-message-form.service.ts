import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserMessageFormService {
  public form!: FormGroup;

  public emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  public namePattern: string = '^[a-zA-ZñÑ ]*$';

  constructor() { }

  get nameErrorMsg(): string {
    const errors = this.form.get('name')?.errors;
    if (errors?.required) {
      return 'Name is Required';
    } else if (errors?.minlength) {
      return 'Enter at least 2 characters';
    } else if (errors?.pattern) {
      return 'Enter only letters';
    }
    return '';
  }

  get emailErrorMsg(): string {
    const errors = this.form.get('email')?.errors;
    if ( errors?.required ) {
      return 'Email is required';
    } else if ( errors?.pattern ) {
      return 'Invalid e-mail';
    }

    return '';
  }

  get passErrorMsg(): string {
    const errors = this.form.get('password')?.errors;
    if (errors?.required) {
      return 'Password is required';
    } else if (errors?.minlength) {
      return 'Enter at least 6 characters';
    }
    return '';
  }

  isValidField = ( field: string ): boolean => {
    return ( this.form.controls?.[field].invalid || false ) && ( this.form.controls?.[field].touched || false );
  }
}

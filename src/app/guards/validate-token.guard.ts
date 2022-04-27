import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ValidateTokenGuard implements CanActivate, CanLoad {
  constructor(
    private _router: Router,
    private _authService: AuthService
  ) {
  }
  canActivate(): Observable<boolean> | boolean {
    return this._authService.validateToken()
      .pipe(
        tap( valid => {          
          if ( !valid ) {
            this._authService.logOut();
            this._router.navigateByUrl('/signin')
          }
        })
      );
  }
  canLoad(): Observable<boolean> | boolean {
    return this._authService.validateToken()
      .pipe(
        tap( valid => {
          if ( !valid ) {
            this._authService.logOut();
            this._router.navigateByUrl('/signin');
          }
        })
      );
  }
}

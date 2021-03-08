import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthJwtService } from '../interceptor/auth-jwt.service';


@Injectable({
  providedIn: 'root'
})
export class IsLoggedGuard implements CanActivate {

  constructor(
    private router: Router,
    private authJWT: AuthJwtService
  ) { }

  canActivate(): boolean {
    if (this.authJWT.getJWT == undefined) {
      this.router.navigate(['/sign-up']);
      return false;
    }
    return true;
  }
}

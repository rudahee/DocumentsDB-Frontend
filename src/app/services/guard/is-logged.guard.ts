import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import Swal from 'sweetalert2';
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
    if (this.authJWT.getJWT() == undefined || this.authJWT.getJWT() == null) {
      Swal.fire({
        title: 'No Auh',
        text: 'Your are not logged in',
        icon: 'question',
        showConfirmButton: true,
        confirmButtonText: 'Go Register',
        showCancelButton: true,
        cancelButtonText: 'Go Login',
      }).then(
        res => {
          if (res.isConfirmed) {
            this.router.navigate(['/sign-up']);
          } else {
            this.router.navigate(['/sign-in']);
          }
        }
      )
      return false;
    }
    return true;
  }
}

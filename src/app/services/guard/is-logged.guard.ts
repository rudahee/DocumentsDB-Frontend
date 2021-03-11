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
      /*
        If try to access a restricted page without logged, send an alert
        that does not allow you to press the escape key or in the background
        to exit, you can only go to login or register.
      */
      Swal.fire({
        title: 'No Auh',
        text: 'Your are not logged in',
        icon: 'question',
        showConfirmButton: true,
        confirmButtonText: 'Go Register',
        showCancelButton: true,
        cancelButtonText: 'Go Login',
        allowEscapeKey: false,
        allowOutsideClick: false,
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

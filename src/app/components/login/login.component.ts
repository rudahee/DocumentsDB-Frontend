import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginData } from 'src/app/interfaces/user-interfaces';
import { AuthJwtService } from 'src/app/services/interceptor/auth-jwt.service';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginData: LoginData;

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]/* Validators.minLength(4)]*/),
    password: new FormControl('', [Validators.required]/* Validators.minLength(4)]*/),
  });

  constructor(
    private userServ: UserService,
    private router: Router,
    private authJWT: AuthJwtService) {

    }

  ngOnInit(): void {
  }

  signIn(): void {
    this.loginData = this.loginForm.value;

    this.userServ.signIn(this.loginData).subscribe(
      resp => {
        //If login is correct
        if (resp != undefined && resp != null) {
          // We save JWT Token, emit changes in isLogged and go to course list
          this.authJWT.saveJWT(resp.headers.get('Authorization').split(' ')[1].trim());
          this.userServ.emitLogged(true);
          this.router.navigate(['/course']);
        }
      },
      _error => {
        // If login is not correct, show error and do nothing.
        Swal.fire({
          title: "Error",
          text: "Authentication failed, try again.",
          icon: "error"
        })
      }
    )
  }
}

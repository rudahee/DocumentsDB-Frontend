import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interfaces/user-interfaces';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    surname: new FormControl(''),
    age: new FormControl(''),
    username: new FormControl('', [Validators.required, Validators.minLength(4)]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  user: IUser;

  constructor(private userServ: UserService, private router: Router) {}

  ngOnInit(): void {
  }

  signUp(): void {
    this.user = this.registerForm.value;
    this.userServ.signUp(this.user).subscribe(
      _response => {
        //If register is correct show a modal window.
        Swal.fire({
          title: "Success",
          text: "Register Success",
          icon: "success",
          showConfirmButton: true,
          confirmButtonText: "Login now!",
          showCancelButton: true,
          cancelButtonText: "Close"
        }).then(
          // Go to login
          result => {
            if (result.isConfirmed) {
              this.router.navigate(['/sign-in']);
            }
          }
        )
      },
      error => {
        // If register its invalid, show a error message
        Swal.fire({
          title: "Error",
          text: error.error.message,
          icon: "error"
        })
      }
    )
  }
}

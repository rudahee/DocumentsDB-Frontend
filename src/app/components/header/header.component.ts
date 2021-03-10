import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthJwtService } from 'src/app/services/interceptor/auth-jwt.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  navMenuOpen: boolean = false;

  profileMenuOpen: boolean = false;

  constructor(
    private AuthJWT: AuthJwtService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  navMenuChangeStatus() {
    this.navMenuOpen = !this.navMenuOpen;
    this.profileMenuOpen = false;
  }
  profileMenuChangeStatus() {
    this.profileMenuOpen = !this.profileMenuOpen;
    this.navMenuOpen = false;
  }

  logout() {
    Swal.fire({
      title: 'Sign Out?',
      text: 'Are you sure?',
      icon: 'question',
      showConfirmButton: true,
      confirmButtonText: 'Yes',
      showCancelButton: true,
      cancelButtonText: 'No',
    }).then(
      res => {
        if (res.isConfirmed) {
          this.router.navigate(['/home']);
          this.AuthJWT.deleteJWT();
        }
      }
    )
  }
}

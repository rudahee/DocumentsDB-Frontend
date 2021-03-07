import { Component, OnInit } from '@angular/core';
import { AuthJwtService } from 'src/app/services/interceptor/auth-jwt.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  navMenuOpen: boolean = false;

  profileMenuOpen: boolean = false;

  constructor(
    private AuthJWT: AuthJwtService
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
    this.AuthJWT.deleteJWT();
  }
}

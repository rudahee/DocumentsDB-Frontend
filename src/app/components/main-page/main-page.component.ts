import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor(private userServ: UserService) { }

  isLogged:boolean;

  ngOnInit(): void {

    this.isLogged = this.userServ.isLogged;
  }

}

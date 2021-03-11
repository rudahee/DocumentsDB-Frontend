import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IUser, LoginData } from 'src/app/interfaces/user-interfaces';
import { AuthJwtService } from '../interceptor/auth-jwt.service';
import { IsLoggedGuard } from '../guard/is-logged.guard';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: IUser;

  isLogged: boolean;

  @Output()
  loggedEmitter = new EventEmitter<boolean>();

  constructor(private httpC: HttpClient, private authJWT: AuthJwtService) {
    // When the service loads, when starting the application, we check if we are logged in.
    if (authJWT.getJWT() != null || authJWT.getJWT() != undefined) {
      this.isLogged = false;
    } else {
      this.isLogged = true;
    }

    this.loggedEmitter.emit(this.isLogged);
  }

  signUp(userForRegister: IUser): Observable<IUser> {
    return this.httpC.post<IUser>('/user/sign-up', userForRegister);
  }

  signIn(loginData: LoginData): Observable<HttpResponse<LoginData>> {
    return this.httpC.post<LoginData>('/user/sign-in', loginData, {observe: 'response'});
  }

  emitLogged(logged: boolean) {
    this.isLogged = logged;
    this.loggedEmitter.emit(this.isLogged)
  }

  signOut() {
    this.authJWT.deleteJWT();
    this.isLogged = false;
    this.loggedEmitter.emit(this.isLogged);
  }

}

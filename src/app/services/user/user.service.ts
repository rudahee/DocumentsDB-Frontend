import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IUser, LoginData } from 'src/app/interfaces/user-interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: IUser;

  constructor(private httpC: HttpClient) { }

  signUp(userForRegister: IUser): Observable<IUser> {

    return this.httpC.post<IUser>('/user/sign-up', userForRegister);
  }

  signIn(loginData: LoginData): Observable<HttpResponse<LoginData>> {
    return this.httpC.post<LoginData>('/user/sign-in', loginData, {observe: 'response'});
  }

}

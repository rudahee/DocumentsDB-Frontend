import { Injectable } from '@angular/core';
import { IJti } from 'src/app/interfaces/jwt-interfaces'
import jwt_decode from 'jwt-decode'

@Injectable({
  providedIn: 'root'
})
export class AuthJwtService {

  constructor() { }

  saveJWT(token: string) {
    localStorage.setItem('jwt', token);
    const tokenDecode:IJti = jwt_decode(token);
    localStorage.setItem('user_id', tokenDecode.jti);

  }

  getJWT(): string {
    return localStorage.getItem("jwt");
  }

  deleteJWT() {
    localStorage.removeItem("jwt");
  }

}

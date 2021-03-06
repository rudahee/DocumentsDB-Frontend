import { Injectable } from '@angular/core';
import { AuthJwtService } from 'src/app/services/interceptor/auth-jwt.service'
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  urlBack = 'http://localhost:8080';

  constructor(private authJWT: AuthJwtService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = this.authJWT.getJWT();

    if (token) { // If exists token put in request
      request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token)});
    }

    if (!token) { // If doesn't exist allows access to the Authorization header
      request = request.clone({ headers: request.headers.set('Access-Control-Expose-Headers', 'Authorization')})
    }

    request = request.clone({headers: request.headers.set('Accept', 'application/json')});

    const url = {url: this.urlBack + request.url};
    request = Object.assign(request, url);
    const urlWithParams = {urlWithParams: this.urlBack + request.urlWithParams};
    request = Object.assign(request, urlWithParams);

    return next.handle(request).pipe(

      map((event: HttpEvent<any>) => {
        return event;
      }),
      finalize(() => {

      })
      );
    }
  }

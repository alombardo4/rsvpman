import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LoginService } from '../services/login.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private token: null | string = null;

  constructor(private loginService: LoginService) {
    this.loginService.token.subscribe(token => this.token = token);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const dupReq = req.clone();

    if(this.token) {
      dupReq.headers.set('Authorization', `Bearer ${this.token}`);
    }

    return next.handle(dupReq);
  }
}

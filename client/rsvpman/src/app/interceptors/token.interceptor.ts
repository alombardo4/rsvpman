import { Injectable, Injector, Inject } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LoginService } from '../services/login.service';
import 'rxjs/add/operator/do';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import 'rxjs/add/operator/share';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private ready = false;
  
  constructor(@Inject('window') private window: Window, private router: Router, private matDialog: MatDialog) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let request;
    const token = this.window.localStorage.getItem('rsvpman.token');
    if(token) {
      request = req.clone({headers: req.headers.set('Authorization', `Bearer ${token}`)});
    } else {
      request = req;
    }

    return next.handle(request).do(
      _ => { },
      err => {
        if(err instanceof HttpErrorResponse) {
          if(err.status === 401) {
            this.window.localStorage.removeItem('rsvpman.token');
            this.matDialog.closeAll();
            this.router.navigate(['login']);
          }
      }
    }).share();
  }
}

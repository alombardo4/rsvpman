import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

const TOKEN_NAME = 'rsvpman.token';

@Injectable()
export class LoginService {
  
  private _token: string;
  private tokenObservers: Observer<string>[] = [];

  constructor(private httpClient: HttpClient,
    private configService: ConfigService,
    @Inject('window') private window: Window) { }

  login(email: string, password: string): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.configService.getBaseHost()
        .subscribe(
          host => {
            this.httpClient.post(`${host}/api/auth/local`, { email: email, password: password})
              .subscribe(
                data => {
                  observer.next(data);
                  observer.complete();
                },
                err => {
                  observer.error(err);
                  observer.complete();
                }
              );
          }
        );
    });
  }

  saveToken(token: string) {
    this._token = token;
    this.window.localStorage.setItem(TOKEN_NAME, token);
    this.tokenObservers.forEach(observer => {
      if(!observer.closed) {
        observer.next(this._token);
      }
    })
  }

  clearToken() {
    this._token = null;
    this.window.localStorage.removeItem(TOKEN_NAME);
    this.tokenObservers.forEach(observer => {
      if(!observer.closed) {
        observer.next(null);
      }
    })
  }

  getToken(): string | null {
    if(this._token) {
      return this._token;
    }
    const token = this.window.localStorage.getItem(TOKEN_NAME);
    if(token) {
      this._token = token;
      return token;
    } else {
      return null;
    }
  }

  token = Observable.create(observer => {
    this.tokenObservers.push(observer);
    const t = this.getToken();
    if(t) {
      observer.next(t);
    }
  })

}

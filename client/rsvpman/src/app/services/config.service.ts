import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/share';

@Injectable()
export class ConfigService {

  private baseHost = 'http://localhost:4000';

  constructor(private httpClient: HttpClient) { }

  getBaseHost(): Observable<string> {
    return Observable.create((observer: Observer<string>) => {
      if (this.baseHost === '') {
        observer.next(this.baseHost);
        observer.complete();
        return;
      }
      this.httpClient.get(`${this.baseHost}/api/info`)
        .subscribe(
          data => {
            observer.next(this.baseHost);
            observer.complete();
          },
          err => {
            this.baseHost = '';
            observer.next(this.baseHost);
            observer.complete();
          }
        );
    }).share();
  }
}

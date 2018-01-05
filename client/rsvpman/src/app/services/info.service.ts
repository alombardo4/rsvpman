import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/share';
import { ConfigService } from './config.service';

@Injectable()
export class InfoService {

  private baseHost = 'http://localhost:4000';

  constructor(private httpClient: HttpClient,
              private configService: ConfigService) { }

  getInfo(): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.configService.getBaseHost()
        .subscribe(
          host => {
            this.httpClient.get(`${host}/api/info`)
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
}

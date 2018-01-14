import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/share';
import { ConfigService } from './config.service';
import { User } from '../users/user.model';

@Injectable()
export class UsersService {


  constructor(private httpClient: HttpClient,
              private configService: ConfigService) { }

  getUsers(): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.configService.getBaseHost()
        .subscribe(
          host => {
            this.httpClient.get(`${host}/api/users`)
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

  getUser(id: string): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.configService.getBaseHost()
        .subscribe(
          host => {
            this.httpClient.get(`${host}/api/users`)
              .subscribe(
                (data: User[]) => {
                  observer.next(data.find(user => user._id === id));
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

  createUser(user: User): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.configService.getBaseHost()
        .subscribe(
          host => {
            this.httpClient.post(`${host}/api/users`, user)
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

  deleteUser(id: string): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.configService.getBaseHost()
        .subscribe(
          host => {
            this.httpClient.delete(`${host}/api/users/${id}`)
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

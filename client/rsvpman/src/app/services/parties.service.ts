import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/share';
import { ConfigService } from './config.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

@Injectable()
export class PartiesService {


  constructor(private httpClient: HttpClient,
              private configService: ConfigService) { }

  getParties(): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.configService.getBaseHost()
        .subscribe(
          host => {
            this.httpClient.get(`${host}/api/parties`)
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

  getParty(id: string): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.configService.getBaseHost()
        .subscribe(
          host => {
            this.httpClient.get(`${host}/api/parties`)
              .subscribe(
                (data: any[]) => {
                  observer.next(data.find(parties => parties._id === id));
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

  createParty(parties): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.configService.getBaseHost()
        .subscribe(
          host => {
            this.httpClient.post(`${host}/api/parties`, parties)
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

  updateParty(id: string, party): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.configService.getBaseHost()
        .subscribe(
          host => {
            this.httpClient.put(`${host}/api/parties/${id}`, party)
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

  deleteParty(id: string): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.configService.getBaseHost()
        .subscribe(
          host => {
            this.httpClient.delete(`${host}/api/parties/${id}`)
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

  getExport(): Observable<any> {
    return this.configService.getBaseHost()
      .switchMap(host => {
        return this.httpClient.get(`${host}/api/parties/export`, {responseType: 'text'});
      })
      .switchMap(data => {
        const file = new Blob([data]);
        if (window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(file, 'export.csv');
        } else {
          const a = document.createElement('a');
          const url = URL.createObjectURL(file);
          a.href = url;
          a.download = 'export.csv';
          document.body.appendChild(a);
          a.click();
          setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
          }, 0);
        }
        return Observable.of(data);
      });
  }
}

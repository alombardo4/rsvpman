import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/share';
import { ConfigService } from './config.service';

@Injectable()
export class RSVPService {

  constructor(private httpClient: HttpClient,
              private configService: ConfigService) { }

  getRSVPDetails(key: string): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.configService.getBaseHost()
        .subscribe(
          host => {
            this.httpClient.get(`${host}/api/rsvp/${key}`)
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

  findKeys(firstName: string, lastName: string): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.configService.getBaseHost()
        .subscribe(
          host => {
            this.httpClient.get(`${host}/api/rsvp/findKeys?firstName=${firstName}&lastName=${lastName}`)
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

  rsvpToParty(key: string, attendees: any[]): Observable<any> {
    const submitAttendees = [...attendees].map(person => {
      return {
        firstName: person.firstName,
        lastName: person.lastName,
        attending: person.attending
      };
    });
    return Observable.create((observer: Observer<any>) => {
      this.configService.getBaseHost()
        .subscribe(
          host => {
            this.httpClient.post(`${host}/api/rsvp/${key}`, {attendees: submitAttendees})
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

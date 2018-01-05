import { Component, OnInit } from '@angular/core';
import { InfoService } from '../services/info.service';
import { DatePipe } from '@angular/common';

@Component({
  providers: [
    DatePipe
  ],
  selector: 'app-thanks',
  template: `
    <h1>Thank you for your RSVP</h1>
    <h2>We can't wait to see you</h2>
    <h3 *ngIf="date">{{date | date: 'fullDate'}}</h3>
  `,
  styleUrls: ['./thanks.component.css']
})
export class ThanksComponent implements OnInit {

  date: Date;

  constructor(private infoService: InfoService) { }

  ngOnInit() {
    this.infoService.getInfo()
      .subscribe(info => {
        this.date = info.date;
      });
  }

}

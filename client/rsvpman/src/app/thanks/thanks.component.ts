import { Component, OnInit } from '@angular/core';
import { InfoService } from '../services/info.service';
import { DatePipe } from '@angular/common';

@Component({
  providers: [
    DatePipe
  ],
  selector: 'app-thanks',
  template: `
    <mat-card>
      <mat-card-content>
        <h1>Thank you for your RSVP</h1>
        <h2>{{this.message}}</h2>
        <h3 *ngIf="date">{{date | date: 'fullDate'}}</h3>
        <a [routerLink]="['/']">Go home</a>
      </mat-card-content>
    </mat-card>

  `,
  styleUrls: ['./thanks.component.css']
})
export class ThanksComponent implements OnInit {

  message: string;
  date: Date;

  constructor(private infoService: InfoService) { }

  ngOnInit() {
    this.infoService.getInfo()
      .subscribe(info => {
        this.date = info.date;
        this.message = info.thankYouMessage;
      });
  }

}

import { Component, OnInit } from '@angular/core';
import { InfoService } from '../services/info.service';
import { MatSnackBar } from '@angular/material';
import { DatePipe } from '@angular/common';
import { RSVPService } from '../services/rsvp.service';
import { Router } from '@angular/router';

@Component({
  providers: [
    DatePipe
  ],
  selector: 'app-home',
  template: `
    <div class="home">
      <mat-card>
        <mat-card-content>
          <h1>{{name}}</h1>
          <p>{{date | date: 'fullDate'}}
          <h3>Please RSVP Below</h3>
          <form novalidate>
            <mat-form-field>
              <input type="text" matInput placeholder="Enter your keyword" autofocus [value]="currentKey" (input)="handleKeyChange($event)"/>
            </mat-form-field>
            <button type="submit" mat-raised-button color="primary" [disabled]="currentKey === '' || disableSubmit" (click)="handleRSVPClick()">RSVP</button>
            <p *ngIf="error" class="error">{{error}}</p>
          </form>
          <a routerLink="search">Having trouble finding your keyword?</a>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  name: string;
  date: Date;

  disableSubmit = false;
  error = '';
  currentKey = '';


  constructor(private infoService: InfoService,
              private rsvpService: RSVPService,
              private matSnackBar: MatSnackBar,
              private router: Router) { }

  ngOnInit() {
    this.disableSubmit = true;
    this.infoService.getInfo()
      .subscribe(
        data => {
          this.disableSubmit = false;
          this.name = data.name;
          this.date = data.date;
        },
        err => this.handleError()
      );

  }

  handleError() {
    this.matSnackBar.open('Oops, it looks like an error occurred. Please try again later.', null, {duration: 6000 });
  }

  handleKeyChange(event) {
    this.currentKey = event.target.value;
  }

  handleRSVPClick() {
    this.disableSubmit = true;
    this.rsvpService.getRSVPDetails(this.currentKey)
      .subscribe(
        data => {
          this.router.navigate(['rsvp', this.currentKey]);
        },
        err => {
          if (err.status === 404) {
            this.error = 'That keyword didn\'t work. Please try another.';
          } else {
            this.handleError();
          }
          this.disableSubmit = false;
        }
      );
  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { RSVPService } from '../services/rsvp.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rsvp',
  template: `
    <div class="rsvp">
      <mat-card>
        <mat-card-content *ngIf="!rsvpData?.hasRSVPd && !loading">
          <h1>Please RSVP for your party</h1>
          <div class="party-member" *ngFor="let person of rsvpData?.people">
            <label>{{person.firstName}} {{person.lastName}}</label>
            <mat-radio-group class="options" [(ngModel)]="person.attending">
              <mat-radio-button [value]="true">Accepts with Pleasure</mat-radio-button>
              <mat-radio-button [value]="false">Regretfully Declines</mat-radio-button>
            </mat-radio-group>
          </div>
          <mat-form-field>
            <textarea matInput [(ngModel)]="rsvpData.rsvpNote" placeholder="Notes (optional)" matTextareaAutosize matAutosizeMinRows="2" matAutosizeMaxRows="10"></textarea>
          </mat-form-field>
          <button *ngIf="!rsvpData?.hasRSVPd" mat-raised-button color="primary" (click)="handleRSVPClicked()" [disabled]="!rsvpData || disableSubmit">RSVP</button>
        </mat-card-content>
        <mat-card-content *ngIf="rsvpData?.hasRSVPd && !loading">
          <h3>Your response has already been recorded. Thanks!</h3>
          <a [routerLink]="['/']">Go home</a>
        </mat-card-content>
        <mat-card-content *ngIf="loading">
          <mat-spinner></mat-spinner>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styleUrls: ['./rsvp.component.scss']
})
export class RsvpComponent implements OnInit, OnDestroy {

  router$: Subscription;

  loading = true;

  currentKey: string;

  rsvpData;

  disableSubmit = false;

  constructor(private route: ActivatedRoute,
              private rsvpService: RSVPService,
              private matSnackbar: MatSnackBar,
              private router: Router) { }

  ngOnInit() {
    this.router$ = this.route.params.subscribe(params => {
      this.currentKey = params.key;
      this.rsvpService.getRSVPDetails(this.currentKey)
        .subscribe(
          data => {
            this.rsvpData = data;
            this.rsvpData.people.forEach(person => {
              person.attending = true;
            });
            this.rsvpData.rsvpNote = '';
            this.loading = false;
          },
          err => {
            this.handleError('It looks like we\'re having trouble loading your RSVP information. Please try again later.');
          }
        );
    });
  }

  ngOnDestroy() {
    this.router$.unsubscribe();
  }

  handleRSVPClicked() {
    this.disableSubmit = true;
    this.rsvpService.rsvpToParty(this.currentKey, this.rsvpData.people, this.rsvpData.rsvpNote)
      .subscribe(
        data => {
          this.router.navigate(['thanks']);
          this.disableSubmit = false;
        },
        err => {
          this.handleError('It looks like your RSVP failed to save. Please try again later');
          this.disableSubmit = false;
        }
      );
  }

  handleError(message: string) {
    this.matSnackbar.open(message, null, { duration: 6000 });
  }
}

import { Component, OnInit } from '@angular/core';
import { RSVPService } from '../services/rsvp.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-name-search',
  template: `
    <div class="search">
      <mat-card>
        <mat-card-content>
          <h3>Having trouble finding your keyword?</h3>        
          <p>Enter your first and last name below to look it up</p>
          <form novalidate >
            <mat-form-field>
              <input type="text" matInput placeholder="First Name" autofocus [value]="firstName" (input)="handleChange('firstName', $event)" />
            </mat-form-field>
            <mat-form-field>
              <input type="text" matInput placeholder="Last Name" autofocus [value]="lastName" (input)="handleChange('lastName', $event)" />
            </mat-form-field>
            <button type="submit" mat-raised-button color="primary" (click)="handleSubmit($event)" [disabled]="loading || !lastName || !firstName">Search</button>
            <p *ngIf="error" class="error">{{error}}</p>
          </form>
          <a [routerLink]="['/']">Go home</a>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styleUrls: ['./name-search.component.scss']
})
export class NameSearchComponent implements OnInit {

  firstName = '';

  lastName = '';

  loading = false;

  searchResults: string[];

  error = '';

  constructor(private rsvpService: RSVPService, private router: Router) { }

  ngOnInit() {
  }

  handleChange(field, event) {
    this[field] = event.target.value;
  }

  handleSubmit(event) {
    event.preventDefault();

    this.loading = true;
    this.error = '';

    this.rsvpService.findKeys(this.firstName, this.lastName)
      .subscribe(
        data => {
          this.searchResults = data;
          this.loading = false;
          this.router.navigate(['/rsvp', this.searchResults[0]]);
        },
        err => {
          if (err.status === 404) {
            this.error = 'We couldn\'t find any results with your name';
          } else {
            this.error = 'An error occurred while looking up your results. Please try again.';
          }
          this.loading = false;
        }
      );
  }

}

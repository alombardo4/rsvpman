import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { PartiesService } from '../services/parties.service';
import { Party, Person } from '../parties/party.model';

@Component({
  selector: 'app-admin-home',
  template: `
    <app-admin-header></app-admin-header>
    <mat-card class="container">
      <mat-card-content>
        <h1>Welcome to RSVPMan Admin Panel</h1>
        <button mat-raised-button (click)="handleDownload()">Download Export</button>
        <div class="buttons">
          <mat-card [routerLink]="['/admin', 'users']">
            <mat-card-content>
              <h3>Users</h3>
              <p>Total: {{users?.length}}</p>
            </mat-card-content>
          </mat-card>
          <mat-card [routerLink]="['/admin', 'parties']">
            <mat-card-content>
              <h3>Parties</h3>
              <p>Total: {{parties?.length}}</p>
              <p>RSVPs Received: {{getRSVPYesCount()}} / {{parties?.length}}
            </mat-card-content>
          </mat-card>
          <mat-card [routerLink]="['/admin', 'guests']">
            <mat-card-content>
              <h3>Guests</h3>
              <p>Total Invited: {{getGuestCount()}}</p>
              <p>Attending: {{getGuestAttendingCount()}}</p>
            </mat-card-content>
          </mat-card>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {

  users: any[];
  parties: any[];

  constructor(private usersService: UsersService,
              private partiesService: PartiesService) { }

  ngOnInit() {
    this.usersService.getUsers().subscribe(users => this.users = users);
    this.partiesService.getParties().subscribe(parties => this.parties = parties);
  }

  getRSVPYesCount(): number {
    if(!this.parties) {
      return 0;
    }
    return this.parties.filter((party: Party) => party.hasRSVPd === true).length;
  }

  getGuestCount(): number {
    if(!this.parties) {
      return 0;
    }
    let counter = 0;
    this.parties.forEach((party: Party) => {
      counter += party.people.length;
    });
    return counter;
  }

  getGuestAttendingCount(): number {
    if(!this.parties) {
      return 0;
    }

    let counter = 0;
    this.parties.forEach((party: Party) => {
      counter += party.people.filter((person: Person) => person.attending).length;
    })
    return counter;
  }

  handleDownload() {
    this.partiesService.getExport()
      .subscribe();
  }

}

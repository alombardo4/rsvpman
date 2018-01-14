import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Person, Party } from '../parties/party.model';
import { PartiesService } from '../services/parties.service';

@Component({
  selector: 'app-guests',
  template: `
    <app-admin-header></app-admin-header>
    <mat-card>
      <mat-card-content>
        <h1>Guests</h1>

        <mat-toolbar>
          <mat-toolbar-row>
            <span>Total Guests: {{guests.length}}</span>
            <mat-select [value]="filterValue" (change)="handleFilterChange($event)">
              <mat-option value="all">All Guests</mat-option>
              <mat-option value="noRSVP">No RSVP Received</mat-option>
              <mat-option value="yesRSVP">RSVP Recevied</mat-option>
              <mat-option value="noAttending">Not Attending</mat-option>
              <mat-option value="yesAttending">Attending</mat-option>
            </mat-select>
          </mat-toolbar-row>
        </mat-toolbar>

        <mat-table [dataSource]="peopleSource">
          <mat-header-row *matHeaderRowDef="columns"></mat-header-row>
          <mat-row *matRowDef="let row; columns: columns;"></mat-row>
          <ng-container matColumnDef="firstName">
            <mat-header-cell *matHeaderCellDef>First Name</mat-header-cell>
            <mat-cell *matCellDef="let element">{{element.firstName}}</mat-cell>
          </ng-container>
          <ng-container matColumnDef="lastName">
            <mat-header-cell *matHeaderCellDef>Last Name</mat-header-cell>
            <mat-cell *matCellDef="let element">{{element.lastName}}</mat-cell>
          </ng-container>
          <ng-container matColumnDef="hasRSVPd">
            <mat-header-cell *matHeaderCellDef>RSVP Received</mat-header-cell>
            <mat-cell *matCellDef="let element">{{element.hasRSVPd ? 'Yes' : 'No'}}</mat-cell>
          </ng-container>
          <ng-container matColumnDef="attending">
            <mat-header-cell *matHeaderCellDef>Attending</mat-header-cell>
            <mat-cell *matCellDef="let element">{{element.attending ? 'Yes' : 'No'}}</mat-cell>
          </ng-container>


        </mat-table>
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: ['./guests.component.scss']
})
export class GuestsComponent implements OnInit {

  columns = ['firstName', 'lastName', 'hasRSVPd', 'attending'];

  peopleSource = new MatTableDataSource<Guest>();
  guests: Guest[] = [];
  filterValue = 'all';

  constructor(private partiesService: PartiesService) { }

  ngOnInit() {
    this.partiesService.getParties()
      .subscribe((data: Party[]) => {
        let guests: Guest[] = [];

        data.forEach((party: Party) => {
          guests = guests.concat(
            party.people.map((person: Person) => {
              return {
                ...person,
                hasRSVPd: party.hasRSVPd
              };
            })
          )
        });
        this.guests = guests;
        this.peopleSource = new MatTableDataSource<Guest>(guests);

      })
  }

  handleFilterChange(event) {
    this.filterValue = event.value;
    if(this.filterValue === 'noRSVP') {
      this.peopleSource = new MatTableDataSource<Guest>(this.guests.filter((guest: Guest) => guest.hasRSVPd === false));
    } else if(this.filterValue === 'yesRSVP') {
      this.peopleSource = new MatTableDataSource<Guest>(this.guests.filter((guest: Guest) => guest.hasRSVPd === true));
    } else if(this.filterValue === 'noAttending') {
      this.peopleSource = new MatTableDataSource<Guest>(this.guests.filter((guest: Guest) => guest.attending === false));
    } else if(this.filterValue === 'yesAttending') {
      this.peopleSource = new MatTableDataSource<Guest>(this.guests.filter((guest: Guest) => guest.attending === true));
    } else {
      this.peopleSource = new MatTableDataSource<Guest>(this.guests);
    }
  }

}

interface Guest extends Person {
  hasRSVPd: boolean
}
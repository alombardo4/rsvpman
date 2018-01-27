import { Component, OnInit } from '@angular/core';
import { PartiesService } from '../services/parties.service';
import { Party, Person } from './party.model';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { PartyModalComponent } from './party-modal/party-modal.component';
import { NotesModalComponent } from './notes-modal/notes-modal.component';

@Component({
  selector: 'app-parties',
  template: `
    <app-admin-header></app-admin-header>
    <mat-card class="body">
      <mat-card-content>
        <h1>Party Management</h1>
        <mat-toolbar>
          <mat-toolbar-row>
            <button mat-raised-button (click)="handleCreate()">Create</button>
            <mat-form-field>
              <mat-select [value]="filterValue" (change)="handleFilterChange($event)">
                <mat-option value="all">Show All</mat-option>
                <mat-option value="noRSVP">RSVP Not Received</mat-option>
                <mat-option value="yesRSVP">RSVP Received</mat-option>
                <mat-option value="noAttendees">No guests attending</mat-option>
                <mat-option value="allAttending">All guests attending</mat-option>
              </mat-select>
            </mat-form-field>
          </mat-toolbar-row>
        </mat-toolbar>
        <mat-table #table [dataSource]="dataSource">
          <mat-header-row *matHeaderRowDef="columns"></mat-header-row>
          <mat-row *matRowDef="let row; columns: columns;"></mat-row>
          <ng-container matColumnDef="key">
            <mat-header-cell *matHeaderCellDef>Key</mat-header-cell>
            <mat-cell *matCellDef="let element"> {{element.key}} </mat-cell>
          </ng-container>
          <ng-container matColumnDef="hasRSVPd">
            <mat-header-cell *matHeaderCellDef>RSVP Received</mat-header-cell>
            <mat-cell *matCellDef="let element"> {{element.hasRSVPd ? 'Yes' : 'No'}} </mat-cell>
          </ng-container>
          <ng-container matColumnDef="numPeople">
            <mat-header-cell *matHeaderCellDef>Number of Guests</mat-header-cell>
            <mat-cell *matCellDef="let element"> {{element.people.length}} </mat-cell>
          </ng-container>
          <ng-container matColumnDef="numYes">
            <mat-header-cell *matHeaderCellDef>Number of Yes</mat-header-cell>
            <mat-cell *matCellDef="let element"> {{getYes(element.people)}} </mat-cell>
          </ng-container>
          <ng-container matColumnDef="numNo">
            <mat-header-cell *matHeaderCellDef>Number of No</mat-header-cell>
            <mat-cell *matCellDef="let element"> {{getNo(element.people)}} </mat-cell>
          </ng-container>

          <ng-container matColumnDef="hasNotes">
            <mat-header-cell *matHeaderCellDef>Has Notes?</mat-header-cell>
            <mat-cell *matCellDef="let element"> {{element.rsvpNote ? 'Yes' : 'No'}} </mat-cell>
          </ng-container>
          
          <ng-container matColumnDef="actions">
            <mat-header-cell *matHeaderCellDef>Actions</mat-header-cell>
            <mat-cell *matCellDef="let element">
              <button mat-icon-button (click)="handleShowNotes(element._id)"><mat-icon>notes</mat-icon></button>
              <button mat-icon-button (click)="handleEdit(element._id)"><mat-icon>edit</mat-icon></button>
              <button mat-icon-button (click)="handleDelete(element._id)"><mat-icon>delete</mat-icon></button>
            </mat-cell>
          </ng-container>
        </mat-table>
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: ['./parties.component.scss']
})
export class PartiesComponent implements OnInit {

  parties: Party[];

  filterValue = 'all';

  columns = ['key', 'hasRSVPd', 'numPeople', 'numYes', 'numNo', 'hasNotes', 'actions']

  dataSource = new MatTableDataSource<Party>();
  
  constructor(private partiesService: PartiesService,
              private matDialog: MatDialog) { }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.partiesService.getParties().subscribe(parties => {
      this.parties = parties;
      this.dataSource = new MatTableDataSource<Party>(this.parties);
      this.filterValue = 'all';
    });
  }

  handleFilterChange(event) {
    this.filterValue = event.value;
    this.dataSource = new MatTableDataSource<Party>(
      this.parties.filter((party: Party) => {
        if(this.filterValue === 'noRSVP') {
          return party.hasRSVPd === false;
        } else if(this.filterValue === 'yesRSVP') {
          return party.hasRSVPd === true;
        } else if(this.filterValue === 'noAttendees') {
          return party.people.filter((person: Person) => person.attending === false).length === party.people.length;
        } else if(this.filterValue === 'allAttending') {
          return party.people.filter((person: Person) => person.attending === true).length === party.people.length && party.people.length > 0;
        } else {
          return true;
        }
      })
    );
  }

  getYes(people: Person[]) {
    return people.filter((person: Person) => person.attending === true).length;
  }

  getNo(people: Person[]) {
    return people.filter((person: Person) => person.attending === false).length;
  }

  handleDelete(id: string) {
    this.matDialog.open(PartyModalComponent, { data: { type: 'DELETE', id: id }})
      .afterClosed()
      .subscribe(_ => this.reloadData());
  }

  handleCreate() {
    this.matDialog.open(PartyModalComponent, { data: { type: 'ADD' }, width: '90vw'})
      .afterClosed()
      .subscribe(_ => this.reloadData());
  }

  handleEdit(id: string) {
    this.matDialog.open(PartyModalComponent, { data: { type: 'EDIT', id: id }, width: '90vw'})
      .afterClosed()
      .subscribe(_ => this.reloadData());
  }

  handleShowNotes(id: string) {
    const note = this.parties.find((party: Party) => party._id === id).rsvpNote;
    this.matDialog.open(NotesModalComponent, { data: { note: note}});
  }
}

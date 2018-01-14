import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource, MatDialog, MatCheckboxChange } from '@angular/material';
import { PartiesService } from '../../services/parties.service';
import { Party, Person } from '../party.model';
import { PersonModalComponent, PersonModalData, PersonModalResponse } from '../person-modal/person-modal.component';

@Component({
  selector: 'app-party-modal',
  template: `
  <div class="add-modal" *ngIf="type === 'ADD' || type === 'EDIT'">
    <h1 mat-dialog-title *ngIf="type === 'ADD'">Create Party</h1>
    <h1 mat-dialog-title *ngIf="type === 'EDIT'">Edit Party</h1>

    <div mat-dialog-content class="form">
      <p class="error" *ngIf="error">{{error}}</p>
      <mat-card>
        <mat-card-content>
          <mat-form-field>
            <input matInput type="text" [value]="party?.key" placeholder="Key" (input)="handleChange('key', $event)" />
          </mat-form-field>
          <mat-checkbox [checked]="party?.hasRSVPd" (change)="handleRSVPChange($event)">RSVP Received</mat-checkbox>
        </mat-card-content>
      </mat-card>
      <mat-toolbar>
        <mat-toolbar-row class="people-header">
          <span>People</span>
          <button mat-raised-button (click)="addPerson()">Create</button>
        </mat-toolbar-row>
      </mat-toolbar>
      <p *ngIf="party?.people.length === 0">No people yet...</p>
      <mat-table [dataSource]="peopleSource" *ngIf="party?.people.length > 0">
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
        <ng-container matColumnDef="attending">
          <mat-header-cell *matHeaderCellDef>Attending</mat-header-cell>
          <mat-cell *matCellDef="let element">{{element.attending ? 'YES' : 'NO'}}</mat-cell>
        </ng-container>
        <ng-container matColumnDef="actions">
          <mat-header-cell *matHeaderCellDef>Actions</mat-header-cell>
          <mat-cell *matCellDef="let element">
            <button mat-icon-button (click)="handleEditPerson(element)"><mat-icon>edit</mat-icon></button>
            <button mat-icon-button (click)="handleDeletePerson(element)"><mat-icon>delete</mat-icon></button>
          </mat-cell>
        </ng-container>
      </mat-table>
    </div>

    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-raised-button color="primary" (click)="handleSave()" [disabled]="!party?.key">Save</button>
    </div>
  </div>
  <div *ngIf="type === 'DELETE'">
    <h1 mat-dialog-title>Delete Party</h1>

    <div mat-dialog-content class="form">
      <p class="error" *ngIf="error">{{error}}</p>
      <p>Are you sure you want to delete this party?</p>
    </div>

    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-raised-button color="warn" (click)="handleDelete()">Delete</button>
    </div>
  </div>
  `,
  styleUrls: ['./party-modal.component.scss']
})
export class PartyModalComponent implements OnInit {

  type: 'ADD' | 'EDIT' | 'DELETE';

  columns = ['firstName', 'lastName', 'attending', 'actions'];

  peopleSource: MatTableDataSource<Person>;

  error = '';

  id: string | null;

  party: Party;

  constructor(private dialogRef: MatDialogRef<PartyModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private partiesService: PartiesService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.type = this.data.type;
    if(this.data.id) {
      this.id = this.data.id;
      if(this.type === 'EDIT') {
        this.partiesService.getParty(this.id)
          .subscribe(party => {
            this.party = party;
            this.peopleSource = new MatTableDataSource<Person>(this.party.people);
          });
      }
    } else if(this.type === 'ADD') {
      this.party = {
        key: '',
        people: [],
        hasRSVPd: false
      };
      this.peopleSource = new MatTableDataSource<Person>(this.party.people);
    }
  }

  handleChange(field: string, event) {
    this.party[field] = event.target.value;
  }

  handleDelete() {
    this.partiesService.deleteParty(this.id)
      .subscribe(_ => this.dialogRef.close());
  }

  handleSave() {
    this.error = '';
    if(this.type === 'ADD') {
      this.partiesService.createParty(this.party)
        .subscribe(
          _ => this.dialogRef.close(),
          err => {
            if(err.error.errmsg.indexOf('duplicate key')) {
              this.error = 'A party already exists with that key';
            } else {
              this.error = 'An unexpected error occurred. Please try again';
            }
          }
        );
    } else if(this.type === 'EDIT') {
      this.partiesService.updateParty(this.party._id, this.party)
        .subscribe(
          _ => this.dialogRef.close(),
          err => {
            this.error = 'An unexpected error occurred. Please try again';
          }
        )
    }
  }

  addPerson() {
    const addData: PersonModalData = {
      type: 'ADD',
      person: {
        firstName: '',
        lastName: '',
        attending: false
      }
    };
    this.dialog.open(PersonModalComponent, { data: addData, disableClose: true})
      .afterClosed()
      .subscribe((data: PersonModalResponse) => {
        if(data.result === 'SAVE') {
          data.person._id = 'new' + data.person.firstName + data.person.lastName;
          this.party.people.push(data.person);
          this.peopleSource = new MatTableDataSource<Person>(this.party.people);
        }
      })
  }

  handleEditPerson(person: Person) {
    const editData: PersonModalData = {
      type: 'EDIT',
      person: person
    };
    this.dialog.open(PersonModalComponent, { data: editData, disableClose: true })
      .afterClosed()
      .subscribe((data: PersonModalResponse) => {
        if(data.result === 'SAVE') {
          this.party.people = [...this.party.people].map((person: Person) => {
            if(person._id === data.person._id) {
              return data.person;
            } else {
              return person;
            }
          })
          this.peopleSource = new MatTableDataSource<Person>(this.party.people);
        }
      });
  }

  handleDeletePerson(person: Person) {
    const deleteData: PersonModalData = {
      type: 'DELETE',
      person: person
    };
    this.dialog.open(PersonModalComponent, { data: deleteData, disableClose: true })
      .afterClosed()
      .subscribe((data: PersonModalResponse) => {
        if(data.result === 'DELETE') {
          this.party.people = [...this.party.people].filter((person: Person) => {
            if(person._id === deleteData.person._id) {
              return false;
            } else {
              return true;
            }
          })
          this.peopleSource = new MatTableDataSource<Person>(this.party.people);
        }
      });
  }

  handleRSVPChange(event: MatCheckboxChange) {
    this.party.hasRSVPd = event.checked;
  }

}

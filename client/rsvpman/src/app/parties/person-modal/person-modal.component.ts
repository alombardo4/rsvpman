import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatCheckboxChange } from '@angular/material';
import { Person } from '../party.model';

@Component({
  selector: 'app-person-modal',
  template: `
    <div *ngIf="type === 'ADD' || type === 'EDIT'">
      <h1 mat-dialog-title *ngIf="type === 'ADD'">Create Person</h1>
      <h1 mat-dialog-title *ngIf="type === 'EDIT'">Edit Person</h1>
      <div class="form" mat-dialog-content>
        <mat-form-field>
          <input matInput required type="text" [value]="person?.firstName" placeholder="First Name" (input)="handleChange('firstName', $event)" />
        </mat-form-field>
        <mat-form-field>
          <input matInput required type="text" [value]="person?.lastName" placeholder="Last Name" (input)="handleChange('lastName', $event)" />
        </mat-form-field>
        <mat-checkbox [checked]="person?.attending" (change)="handleAttendingChange($event)">Attending</mat-checkbox>
        <mat-checkbox [checked]="person?.rehearsal?.invited" (change)="handleRehearsalInvitedChanged($event)">Invited to Rehearsal</mat-checkbox>
        <mat-checkbox [disabled]="!person?.rehearsal?.invited" [checked]="person?.rehearsal?.attending" (change)="handleRehearsalAttendingChanged($event)">Attending Rehearsal</mat-checkbox>
      </div>
      <div mat-dialog-actions>
        <button mat-button (click)="handleCancel()">Cancel</button>
        <button mat-raised-button color="primary" (click)="handleSave()">Save</button>
      </div>
    </div>
    <div *ngIf="type === 'DELETE'">
      <h1 mat-dialog-title>Are you sure you want to delete this person from this party?</h1>
      <div mat-dialog-actions>
        <button mat-button (click)="handleCancel()">Cancel</button>
        <button mat-raised-button color="warn" (click)="handleDelete()">Delete</button>
      </div>
    </div>
  `,
  styleUrls: ['./person-modal.component.scss']
})
export class PersonModalComponent implements OnInit {

  person: Person;

  type: 'ADD' | 'EDIT' | 'DELETE';

  constructor(private dialogRef: MatDialogRef<PersonModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: PersonModalData) { }

  ngOnInit() {
    this.type = this.data.type;
    if(this.type === 'ADD' || this.type === 'EDIT') {
      this.person = this.data.person;
    }
  }

  handleCancel() {
    const result: PersonModalResponse = {
      result: 'CANCEL'
    };
    this.dialogRef.close(result);
  }

  handleDelete() {
    const result: PersonModalResponse = {
      result: 'DELETE'
    };
    this.dialogRef.close(result);
  }

  handleSave() {
    const result = {
      result: 'SAVE',
      person: this.person
    };
    this.dialogRef.close(result);
  }

  handleChange(field: string, event) {
    this.person[field] = event.target.value;
  }

  handleAttendingChange(event: MatCheckboxChange) {
    this.person.attending = event.checked;
  }

  handleRehearsalInvitedChanged(event: MatCheckboxChange) {
    if (!this.person.rehearsal) {
      this.person.rehearsal = {
        invited: false,
        attending: false
      };
    }
    this.person.rehearsal.invited = event.checked;
  }

  handleRehearsalAttendingChanged(event: MatCheckboxChange) {
    if (!this.person.rehearsal) {
      this.person.rehearsal = {
        invited: false,
        attending: false
      };
    }
    this.person.rehearsal.attending = event.checked;
  }


}

export interface PersonModalData {
  person: Person,
  type: 'ADD' | 'EDIT' | 'DELETE'
};

export interface PersonModalResponse {
  person?: Person,
  result: 'SAVE' | 'CANCEL' | 'DELETE'
}

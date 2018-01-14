import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UsersService } from '../../services/users.service';
import { User } from '../user.model';

@Component({
  selector: 'app-user-modal',
  template: `
    <div *ngIf="type === 'ADD'">
      <h1 mat-dialog-title>Create User</h1>

      <div mat-dialog-content class="form">
        <p class="error" *ngIf="error">{{error}}</p>
        <mat-form-field>
          <input matInput type="text" [value]="user.profile.name" placeholder="Name" (input)="handleChange('name', $event)" />
        </mat-form-field>
        <mat-form-field>
          <input matInput type="email" [value]="user.email" placeholder="Email" (input)="handleChange('email', $event)" />
        </mat-form-field>
        <mat-form-field>
          <input matInput type="password" [value]="user.password" placeholder="Password" (input)="handleChange('password', $event)" />
        </mat-form-field>
      </div>

      <div mat-dialog-actions>
      <button mat-button mat-dialog-close>Cancel</button>
        <button mat-raised-button color="primary" (click)="handleSave()" [disabled]="!user.profile.name || !user.email || !user.password">Save</button>
      </div>
    </div>
    <div *ngIf="type === 'DELETE'">
    <h1 mat-dialog-title>Delete User</h1>

    <div mat-dialog-content class="form">
      <p class="error" *ngIf="error">{{error}}</p>
      <p>Are you sure you want to delete this user?</p>
    </div>

    <div mat-dialog-actions>
    <button mat-button mat-dialog-close>Cancel</button>
      <button mat-raised-button color="warn" (click)="handleDelete()">Delete</button>
    </div>
  </div>
  `,
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements OnInit {
  error = '';
  type: 'ADD' | 'DELETE'
  user: User = {
    profile: {
      name: ''
    },
    email: '',
    password: ''
  };

  constructor(public dialogRef: MatDialogRef<UserModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
              private usersService: UsersService) { }

  ngOnInit() {
    this.type = this.data.type;
  }

  handleChange(field, event) {
    if(field === 'name') {
      this.user.profile.name = event.target.value;
    } else {
      this.user[field] = event.target.value;
    }
  }

  handleSave() {
    this.error = '';
    this.usersService.createUser(this.user)
    .subscribe(
      _ => {
        this.dialogRef.close();
      },
      err => {
        this.error = 'An error occurred while saving. Please try again';
      }
    )
  }

  handleDelete() {
    this.error = '';
    this.usersService.deleteUser(this.data.id)
      .subscribe(
        _ => this.dialogRef.close(),
        err => {
          this.error = 'An error occurred while deleting. Please try again';
        }
      )
  }
}

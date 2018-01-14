import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { DatePipe } from '@angular/common';
import 'rxjs/add/operator/map';
import { UserModalComponent } from './user-modal/user-modal.component';
import { User } from './user.model';

@Component({
  selector: 'app-users',
  providers: [
    DatePipe
  ],
  template: `
    <app-admin-header></app-admin-header>
    <mat-card class="body">
      <mat-card-content>
        <h1>User Management</h1>
        <mat-toolbar>
          <mat-toolbar-row>
            <button mat-raised-button (click)="handleCreate()">Create</button>
          </mat-toolbar-row>
        </mat-toolbar>
        <mat-table #table [dataSource]="dataSource">
          <mat-header-row *matHeaderRowDef="columns"></mat-header-row>
          <mat-row *matRowDef="let row; columns: columns;"></mat-row>
          <ng-container matColumnDef="name">
            <mat-header-cell *matHeaderCellDef>Name</mat-header-cell>
            <mat-cell *matCellDef="let element"> {{element.profile.name}} </mat-cell>
          </ng-container>
          <ng-container matColumnDef="email">
            <mat-header-cell *matHeaderCellDef>Email</mat-header-cell>
            <mat-cell *matCellDef="let element"> {{element.email}} </mat-cell>
          </ng-container>
          <ng-container matColumnDef="createdAt">
            <mat-header-cell *matHeaderCellDef>Created At</mat-header-cell>
            <mat-cell *matCellDef="let element"> {{element.createdAt | date: 'MMM d, yyyy, h:mma'}} </mat-cell>
          </ng-container>
          <ng-container matColumnDef="edit">
            <mat-header-cell *matHeaderCellDef>Actions</mat-header-cell>
            <mat-cell *matCellDef="let element">
              <button mat-icon-button (click)="handleDelete(element._id)"><mat-icon>delete</mat-icon></button>
            </mat-cell>
          </ng-container>
        </mat-table>
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  dataSource = new MatTableDataSource<User>();
  columns = ['name', 'email', 'createdAt', 'edit']

  constructor(private usersService: UsersService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.usersService.getUsers()
      .subscribe(users => {
        this.dataSource = new MatTableDataSource<User>(users);
      });
  }

  handleCreate() {
    this.dialog.open(UserModalComponent, { data: { type: 'ADD' }})
      .afterClosed().subscribe(() => this.reloadData());
  }

  handleDelete(id) {
    this.dialog.open(UserModalComponent, { data: { type: 'DELETE', id: id }})
    .afterClosed().subscribe(() => this.reloadData());
  }

}



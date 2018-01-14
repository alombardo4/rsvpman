import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  template: `
    <mat-toolbar color="primary" class="mat-elevation-z10 toolbar">
      <mat-toolbar-row>
        <button mat-button [routerLink]="['/admin']">RSVPMan Admin</button>
        <button mat-raised-button color="primary" (click)="handleLogout()">Log Out</button>
      </mat-toolbar-row>
    </mat-toolbar>
  `,
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  handleLogout() {
    this.loginService.clearToken();
    this.router.navigate(['/login']);
  }
}

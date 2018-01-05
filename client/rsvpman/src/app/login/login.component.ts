import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  template: `
    <div class="login">
      <mat-card>
        <mat-card-content>
          <h1>Login</h1>
          <form (submit)="handleLogin()">
            <p *ngIf="error" class="error">{{error}}</p>
            <mat-form-field>
              <input type="email" [value]="email" (input)="handleChange('email', $event)" placeholder="Email" matInput required />
            </mat-form-field>
            <mat-form-field>
              <input type="password" [value]="password" (input)="handleChange('password', $event)" placeholder="Password" matInput required />
            </mat-form-field>
            <button type="submit" mat-raised-button color="primary" [disabled]="!email || !password || loading">Log In</button>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email = '';
  password = '';
  error = '';
  loading = false;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  handleChange(fieldName, event) {
    this[fieldName] = event.target.value;
  }

  handleLogin() {
    console.log('login', this.email, this.password);
    this.error = '';
    this.loading = true;
    this.loginService.login(this.email, this.password)
      .subscribe(
        data => {
          this.loading = false;
          this.loginService.saveToken(data.token);
          console.log(data);
        },
        err => {
          this.loading = false;
          if(err.status === 400) {
            this.error = 'Invalid email or password';
          } else {
            this.error = 'Oops, it looks like an error occurred. Please try again.'
          }
        }
      )
  }

}

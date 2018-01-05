import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { Route, RouterModule } from '@angular/router';
import { MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

const routes: Route[] = [
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }

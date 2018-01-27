import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RsvpComponent } from './rsvp.component';
import { Route, RouterModule } from '@angular/router';
import { MatCardModule, MatButtonModule, MatRadioModule, MatSnackBarModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

const routes: Route[] = [
  {
    path: 'rsvp/:key',
    pathMatch: 'full',
    component: RsvpComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatButtonModule,
    MatRadioModule,
    FormsModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [RsvpComponent]
})
export class RsvpModule { }

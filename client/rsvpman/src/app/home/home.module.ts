import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Route} from '@angular/router';
import { MatSnackBarModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatCardModule, MatProgressSpinnerModule } from '@angular/material';

const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }

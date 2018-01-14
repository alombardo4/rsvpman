import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestsComponent } from './guests.component';
import { AuthGuard } from '../guards/auth.guard';
import { Route, RouterModule   } from '@angular/router';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { MatTableModule, MatCardModule, MatToolbarModule, MatFormFieldModule, MatSelectModule } from '@angular/material';

const routes: Route[] = [
  {
    path: 'admin/guests',
    pathMatch: 'full',
    component: GuestsComponent,
    canActivate: [AuthGuard]
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedComponentsModule,
    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  declarations: [GuestsComponent]
})
export class GuestsModule { }

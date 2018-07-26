import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomeComponent } from './admin-home.component';
import { RouterModule, Route } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { MatCardModule, MatToolbarModule, MatButtonModule } from '@angular/material';
import { SharedComponentsModule } from '../shared-components/shared-components.module';

const routes: Route[] = [
  {
    path: 'admin',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    component: AdminHomeComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    SharedComponentsModule,
    MatToolbarModule,
    MatButtonModule
  ],
  declarations: [AdminHomeComponent]
})
export class AdminHomeModule { }

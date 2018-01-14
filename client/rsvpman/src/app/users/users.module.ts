import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { RouterModule, Route } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { MatCardModule, MatButtonModule, MatFormFieldModule, MatDialogModule, MatInputModule, MatTableModule, MatIconModule, MatToolbarModule } from '@angular/material';
import { UserModalComponent } from './user-modal/user-modal.component';

const routes: Route[] = [
  {
    path: 'admin/users',
    pathMatch: 'full',
    component: UsersComponent,
    canActivate: [AuthGuard]
  }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedComponentsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatToolbarModule
  ],
  entryComponents: [ UserModalComponent ],
  declarations: [UsersComponent, UserModalComponent]
})
export class UsersModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartiesComponent } from './parties.component';
import { AuthGuard } from '../guards/auth.guard';
import { Route, RouterModule } from '@angular/router';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { MatTableModule, MatButtonModule, MatIconModule, MatCardModule, MatToolbarModule, MatFormFieldModule, MatInputModule, MatDialogModule, MatCheckboxModule, MatSelectModule } from '@angular/material';
import { PartyModalComponent } from './party-modal/party-modal.component';
import { PersonModalComponent } from './person-modal/person-modal.component';

const routes: Route[] = [
  {
    path: 'admin/parties',
    pathMatch: 'full',
    component: PartiesComponent,
    canActivate: [AuthGuard]
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedComponentsModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule
  ],
  declarations: [PartiesComponent, PartyModalComponent, PersonModalComponent],
  entryComponents: [PartyModalComponent, PersonModalComponent]
})
export class PartiesModule { }

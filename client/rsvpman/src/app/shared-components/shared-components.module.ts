import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { MatToolbarModule, MatButtonModule } from '@angular/material';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule.forChild([])
  ],
  declarations: [AdminHeaderComponent],
  exports: [
    AdminHeaderComponent
  ]
})
export class SharedComponentsModule { }

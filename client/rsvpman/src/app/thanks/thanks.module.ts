import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThanksComponent } from './thanks.component';
import { RouterModule, Route } from '@angular/router';

const routes: Route[] = [
  {
    path: 'thanks',
    pathMatch: 'full',
    component: ThanksComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ThanksComponent]
})
export class ThanksModule { }

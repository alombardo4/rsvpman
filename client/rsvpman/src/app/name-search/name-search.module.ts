import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NameSearchComponent } from './name-search.component';
import { RouterModule, Route} from '@angular/router';
import { MatFormFieldModule, MatButtonModule, MatInputModule, MatCardModule } from '@angular/material';

const routes: Route[] = [{
  path: 'search',
  pathMatch: 'full',
  component: NameSearchComponent
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule
  ],
  declarations: [NameSearchComponent]
})
export class NameSearchModule { }

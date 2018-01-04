import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="body">
      <h1>Hello World</h1>
      <button mat-raised-button color="accent">Click Me</button>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
}

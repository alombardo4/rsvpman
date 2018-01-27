import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-root',
  template: `
    <div class="root" [class.body]="!isAdmin">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  
  router$: Subscription;

  isAdmin = false;

  constructor(private router: Router) { }

  ngOnInit() {
    this.router$ = this.router.events.filter(ev => ev instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
      this.isAdmin = event.url.startsWith('/admin');
    })
  }

  ngOnDestroy() {
    this.router$.unsubscribe();
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import { InfoService } from './services/info.service';
import { Title } from '@angular/platform-browser';

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

  constructor(private router: Router,
              private infoService: InfoService,
              private titleService: Title) { }

  ngOnInit() {
    this.router$ = this.router.events.filter(ev => ev instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
      this.isAdmin = event.url.startsWith('/admin');
    })

    this.infoService.getInfo()
      .subscribe(info => {
        const name = info.name;
        this.titleService.setTitle(`${name} | RSVP`);
      })
  }

  ngOnDestroy() {
    this.router$.unsubscribe();
  }
}

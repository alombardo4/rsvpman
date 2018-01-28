import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { InfoService } from './info.service';
import { ConfigService } from './config.service';
import { RSVPService } from './rsvp.service';
import { LoginService } from './login.service';
import { UsersService } from './users.service';
import { PartiesService } from './parties.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [],
  providers: [
  ]
})
export class ServicesModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ServicesModule,
      providers: [
        InfoService,
        ConfigService,
        RSVPService,
        LoginService,
        UsersService,
        PartiesService,
        { provide: 'window', useFactory: getWindow }
      ]
    };
  }
}


export function getWindow() {
  return window;
}
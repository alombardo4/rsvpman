import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { InfoService } from './info.service';
import { ConfigService } from './config.service';
import { RSVPService } from './rsvp.service';
import { LoginService } from './login.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [],
  providers: [
    { provide: Window, useValue: window}
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
      ]
    };
  }
}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material';
import { HomeModule } from './home/home.module';
import { ServicesModule } from './services/services.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RsvpModule } from './rsvp/rsvp.module';
import { ThanksModule } from './thanks/thanks.module';
import { NameSearchModule } from './name-search/name-search.module';
import { LoginModule } from './login/login.module';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { InfoService } from './services/info.service';
import { ConfigService } from './services/config.service';
import { RSVPService } from './services/rsvp.service';
import { LoginService } from './services/login.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([]),
    HomeModule,
    RsvpModule,
    ServicesModule.forRoot(),
    ThanksModule,
    NameSearchModule,
    LoginModule
  ],
  providers: [

    InfoService,
    ConfigService,
    RSVPService,
    LoginService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

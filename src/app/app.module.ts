import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SignupModule} from "./signup/signup.module";
import {RouterModule} from "@angular/router";
import {WelcomeModule} from "./welcome_screen/welcome.module";
import {LoginModule} from "./login/login.module";
import {DashboardModule} from "./dashboard/dashboard.module";
import {PropertyModule} from "./property/property.module";
import {ProfileUpdateModule} from "./profile_update/profile.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TenantModule} from "./tenant/tenant.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SignupModule,
    WelcomeModule,
    RouterModule,
    LoginModule,
    DashboardModule,
    PropertyModule,
    ProfileUpdateModule,
    BrowserAnimationsModule,
    TenantModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

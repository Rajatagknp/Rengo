import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {WelcomeComponent} from './welcome.component';
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {AuthService} from "../authservices/authservice";
import {HttpClientModule} from "@angular/common/http";
import {SharedService} from "../authservices/shared.service";
import {GlobalService} from "../authservices/global.service";

@NgModule({
  declarations: [
    WelcomeComponent,
  ],
    imports: [
        BrowserModule,
        RouterModule,
        FormsModule,
        HttpClientModule,
    ],
  providers: [AuthService,SharedService,GlobalService],
  bootstrap: [WelcomeComponent]
})
export class WelcomeModule { }

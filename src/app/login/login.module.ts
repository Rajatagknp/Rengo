import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {LoginComponent} from './login.component';
import {FormsModule} from "@angular/forms";
import {SharedService} from "../authservices/shared.service";
import {AuthService} from "../authservices/authservice";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    LoginComponent,
  ],
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule,
    ],
  providers: [SharedService,AuthService],
  bootstrap: [LoginComponent]
})
export class LoginModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {SignupComponent} from './signup.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {AuthService} from "../authservices/authservice";
import {SharedService} from "../authservices/shared.service";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [AuthService,SharedService],
  bootstrap: [SignupComponent]
})
export class SignupModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {RouterModule} from "@angular/router";
import {OwnerdashboardComponent} from "./ownerdashboard.component";
import {AuthService} from "../authservices/authservice";
import {SharedService} from "../authservices/shared.service";
import {ChartsModule} from "ng2-charts";



@NgModule({
  declarations: [
    OwnerdashboardComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    ChartsModule
  ],
  providers: [AuthService,SharedService],
  bootstrap: [OwnerdashboardComponent]
})
export class DashboardModule { }

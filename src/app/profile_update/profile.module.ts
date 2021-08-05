import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {FormsModule} from "@angular/forms";
import {SharedService} from "../authservices/shared.service";
import {AuthService} from "../authservices/authservice";
import {RouterModule} from "@angular/router";
import {ProfileupdateComponent} from "./profileupdate.component";
import {GlobalService} from "../authservices/global.service";
import { MatSliderModule } from '@angular/material/slider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from "@angular/material/core";
import { DatePipe } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    ProfileupdateComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    FormsModule,
    MatSliderModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatSelectModule,
    MatNativeDateModule,
    MatIconModule
  ],
  providers: [GlobalService],
  bootstrap: [ProfileupdateComponent]
})
export class ProfileUpdateModule { }

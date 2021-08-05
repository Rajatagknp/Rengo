import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {AuthService} from "../authservices/authservice";
import {SharedService} from "../authservices/shared.service";
import {RouterModule} from "@angular/router";
import {TenantComponent} from "./tenant.component";
import {GlobalService} from "../authservices/global.service";
import { MatSliderModule } from '@angular/material/slider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from "@angular/material/core";
import { DatePipe } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import {MatIconModule} from "@angular/material/icon";
import {TenantDetailsComponent} from "./tenantdetails/tenantdetails.component";
import {TenantEditComponent} from "./tenantedit/tenantedit.component";
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from "@angular/material/list";
import {TenantListComponent} from "./tenantlist/tenantlist.component";

import { SlickCarouselModule } from 'ngx-slick-carousel';


@NgModule({
  declarations: [
    TenantComponent,
    TenantDetailsComponent,
    TenantEditComponent,
    TenantListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    MatSliderModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatSelectModule,
    MatNativeDateModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    SlickCarouselModule
  ],
  providers: [AuthService,SharedService],
  bootstrap: [TenantComponent]
})
export class TenantModule { }

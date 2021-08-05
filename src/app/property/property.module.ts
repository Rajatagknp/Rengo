import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {AuthService} from "../authservices/authservice";
import {SharedService} from "../authservices/shared.service";
import {PropertyComponent} from "./property.component";
import {AddpropertyComponent} from "./addproperty/addproperty.component";
import {RouterModule} from "@angular/router";
import {NgxSliderModule} from "@angular-slider/ngx-slider";
import {MatSliderModule} from '@angular/material/slider';
import {GlobalService} from "../authservices/global.service";
import {GetPropertyComponent} from "./propertylist/getproperty.component";
import {EditPropertyComponent} from "./editproperty/editproperty.component";
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from "@angular/material/icon";
import { NgImageSliderModule } from 'ng-image-slider';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@NgModule({
  declarations: [
    PropertyComponent,
    AddpropertyComponent,
    GetPropertyComponent,
    EditPropertyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    NgxSliderModule,
    MatSliderModule,
    MatSelectModule,
    MatIconModule,
    NgImageSliderModule,
    SlickCarouselModule
  ],
  providers: [
    AuthService,
    SharedService,
    GlobalService,
  ],
  bootstrap: [PropertyComponent]
})
export class PropertyModule { }

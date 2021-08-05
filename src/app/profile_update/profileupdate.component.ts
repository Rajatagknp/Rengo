import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../authservices/authservice";
import {SharedService} from "../authservices/shared.service";
import { MultiDataSet, Label } from 'ng2-charts';
import { ChartType } from 'chart.js';
import {GlobalService} from "../authservices/global.service";

import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from "@angular/material/core";
import * as _moment from 'moment';
import {defaultFormat as _rollupMoment} from 'moment';
import { FormControl } from "@angular/forms";
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from "@angular/material-moment-adapter";

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD-MMM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'app-root',
  templateUrl: './profileupdate.component.html',
  styleUrls: ['./profileupdate.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})

export class ProfileupdateComponent implements OnInit{
  date = new FormControl(moment);


  constructor(
    private globalservice:GlobalService
  ) {}

  ngOnInit() {
    this.globalservice.info__()
  }

  first_name:any = ''
  last_name:any = ''
  email_id:any = ''
  phone_no:any = ''
  nationality__:any = ''
  selected_gender:any = 'male'
  gender__:any[] = [
    {value_appears:'Male',value:'male'},
    {value_appears:'Female',value:'female'},
    {value_appears:'Others',value:'others'},
  ]
  selected_marital:any = 'unmarried'
  marital:any[] = [
    {value_appears:'UnMarried',value:'unmarried'},
    {value_appears:'Married',value:'married'},
  ]
  birthdate:Date = new Date()
  user_age(value:any){
    let diff = new Date(value).getFullYear()
    let diff2 = new Date().getFullYear()
    return diff2-diff
  }
  selected_profession:any = 'student'
  profession:any[] = [
    {value_appears:'Employed',value:'employed'},
    {value_appears:'Student',value:'student'},
    {value_appears:'Self-Employed',value:'self-employed'},
  ]

  profile_update_head:any = 'User'

}

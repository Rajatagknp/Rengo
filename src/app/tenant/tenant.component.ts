import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from "@angular/material/core";
import * as _moment from 'moment';
import {defaultFormat as _rollupMoment} from 'moment';
import { FormControl } from "@angular/forms";
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from "@angular/material-moment-adapter";
import {GlobalService} from "../authservices/global.service";
import {AuthService} from "../authservices/authservice";

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

export interface AddTenant {
  userId:'',
  email:'',
  firstName:'',
  share:'',
  isMaster:boolean,
  unitId:'',
}

@Component({
  selector: 'app-root',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class TenantComponent implements OnInit{
  date = new FormControl(moment);
  upload_doc:boolean = false;
  name:any = ''
  selected_gender:any = ''
  gender__:any[] = [
    {value_appears:'Male',value:'male'},
    {value_appears:'Female',value:'female'},
    {value_appears:'Others',value:'others'},
  ]
  email_id:any = ''
  contact_no:any = ''
  moving_date!:Date
  outDate!:Date
  selected_rent_share:any = {value:100}
  rent_share:any[] = [
    {value_appears:'100 %',value:'100'},
    {value_appears:'50 %',value:'50'},
    {value_appears:'33.3 %',value:'33.3'},
  ]
  onClickButton(button:any): void {
    if (this.selected_rent_share != button) {
      this.selected_rent_share = button;
    }
  }

  constructor(
    private globalService:GlobalService,
    private authService:AuthService,
    private router:Router,
  ) {}

  ngOnInit() {
    this.globalService.info__()
  }

  continue(){
    console.log(111)
  }

  user_img:any[] = [
    {url:"../assets/add_property/Group%20305.svg",name:''},
    {url:"./assets/add_property/Icon%20feather-upload.svg",name:''},
    {url:"./assets/add_property/Icon%20feather-upload.svg",name:''},
    {url:"./assets/add_property/Icon%20feather-upload.svg",name:''},
  ]

  selectpropertyimg(...values:any[]) {
    let event = values[0]
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.user_img[values[1]].url = event.target?.result;
      }
      this.user_img[values[1]].name = event.target.files[0].name
    }
  }

  next(){
    this.upload_doc = (!this.upload_doc)
  }

  header:any = {'x-api-key':localStorage.getItem("token")}
  save_continue(){
    let unitId = localStorage.getItem("unitId")
    let body = [{
      unitId:unitId,
      firstName:this.name.split(' ')[0],
      lastName:this.name.split(' ')[1],
      gender:this.selected_gender,
      email:this.email_id,
      mobile:this.contact_no,
      share:this.selected_rent_share.value,
      isMaster:true,
      startAt:new Date(this.moving_date.valueOf()),
      endAt:new Date(this.outDate.valueOf())
    }]
    console.log(body)
    this.authService.postTenant(body,this.header).subscribe((response) => {
      console.log(response)
      this.router.navigate(["/tenant/list"])
    })
  }
}

import { Component } from '@angular/core';
import {GlobalService} from "../authservices/global.service";

@Component({
  selector: 'app-root',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
  title = 'Welcome To Rengo';
  email_address: any = '';
  alert_user:boolean = false;

  constructor(
    private globalservice: GlobalService
  ) {}

  continue(...value:any[]){
    if(!value[0]){
      this.globalservice.isEmailValid(this.email_address)
    }else {
      this.alert_user = true;
    }
  }
}

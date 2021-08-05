import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../authservices/authservice";
import {SharedService} from "../authservices/shared.service";

@Component({
  selector: 'app-root',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{
  title = 'Signup To Rengo';
  change_page:boolean = true;
  firstname:any = '';
  lastname:any = '';
  password:any = '';
  re_password:any = '';
  user_type:any = 'owner'
  email_id:any = ''
  alert_user:boolean[] = [false,false,false,false];


  constructor(
    private router: Router,
    private authservice:AuthService,
    private sharedService: SharedService
  ) {}


  ngOnInit() {
    this.sharedService.sharedMessage.subscribe((email_address: any) => {
      this.email_id = email_address
    })
  }

  continue(...values:any[]){
    let false_array = [false,false,false,false]
    let isvalid = JSON.stringify(values)==JSON.stringify(false_array)
    let isequal = this.re_password==this.password
    if(isvalid && isequal){
      this.change_page = false
    }else {
      this.alert_user = [true,true,true,true]
    }
  }

  submit(){
    let body = {
      firstName:this.firstname,
      lastName:this.lastname,
      email:this.email_id,
      password:this.password,
      accountType:this.user_type,
    }
    this.authservice.signup(body).subscribe((response) => {
      let token = response.data.token
      localStorage.setItem('token',token)
      console.log(token)
      if(this.user_type=='owner'){
        this.router.navigate(["/property"])
      }else {
        this.router.navigate(["/owner"])
      }
    },(error) => {
      console.log(error)
    })
  }
}

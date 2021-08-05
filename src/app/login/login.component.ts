import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {count} from "rxjs/operators";
import {SharedService} from "../authservices/shared.service";
import {AuthService} from "../authservices/authservice";

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  title = 'Signup To Rengo';
  style__!: any
  first_name:string = ''
  last_name:string = ''
  password:any = ''
  email_id:any = 'rajat@gmail.com'
  alert_user:boolean = false

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private authservice: AuthService
  ) {}

  ngOnInit(): void {
    this.first_name = this.sharedService.firstname.value
    this.last_name = this.sharedService.lastname.value
    setTimeout(() => {
      if(!this.first_name){
        console.log(this.first_name)
        this.router.navigate(["/login"])
      }
    },500)
  }

  continue(...values:any[]){
    if(values[0]){
      this.alert_user = true;
    }else {
      this.authservice.login(this.email_id,this.password).subscribe((response) => {
        console.log(response)
      })
    }
  }
}

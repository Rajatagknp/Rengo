
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Router} from "@angular/router";
import {AuthService} from "./authservice";
import {SharedService} from "./shared.service";


@Injectable()
export class GlobalService {
  constructor(
    private router:Router,
    private authservice:AuthService,
    private sharedService: SharedService
  ) {}


  public info__(){
    let header = {'x-api-key':localStorage.getItem('token')}
    this.authservice.info(header).subscribe((response) => {
      // console.log(response)
      // if(response.currentRole.name=='tenant'){
      //   this.router.navigate(["/login"])
      // }
    },(error) => {
      console.log(error)
      this.router.navigate(["/login"])
    })
  }

  public isEmailValid(value:any){
    this.authservice.isemailexit(value).subscribe((response) => {
        this.sharedService.firstname.next(response.data.firstName)
        this.sharedService.lastname.next(response.data.lastName)
        this.router.navigate(["login/password"])
      },
      error => {
        this.sharedService.nextEmailId(value)
        this.router.navigate(["signup"])
      })
  }
}

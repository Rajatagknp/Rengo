import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../authservices/authservice";
import {GlobalService} from "../../authservices/global.service";

@Component({
  selector: 'app-root',
  templateUrl: './tenantlist.component.html',
  styleUrls: ['./tenantlist.component.scss'],
})
export class TenantListComponent implements OnInit{

  constructor(
    private router:Router,
    private authService:AuthService,
    private globalService:GlobalService
  ) {}

  header:object = {"x-api-key":localStorage.getItem("token")}
  tenants:any[] = []
  searchTenant:any = ''

  ngOnInit() {
    this.globalService.info__()
    this.authService.get_property(this.header).subscribe((response) => {
      response.data.forEach((element: object, index: number) => {
        // @ts-ignore
        this.authService.getUnit(element.id,this.header).subscribe((unitResponse) => {
          unitResponse.data.forEach((unitElement: any, unitIndex: any) => {
            this.authService.getTenant(unitElement.id,this.header).subscribe((tenantResponse) => {
              if(tenantResponse.data){
                console.log(tenantResponse.data)
                this.tenants.push(tenantResponse.data)
              }
            })
          })
        })
      })
    })
  }

  editTenant(...value:number[]){
    let tenantId = this.tenants[value[0]][value[1]].id
    localStorage.setItem('tenantId',tenantId)
    this.router.navigate(["/tenant/edit"])
  }

}

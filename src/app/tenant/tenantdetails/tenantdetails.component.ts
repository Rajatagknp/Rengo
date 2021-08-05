import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../authservices/authservice";

@Component({
  selector: 'app-root',
  templateUrl: './tenantdetails.component.html',
  styleUrls: ['./tenantdetails.component.scss'],
})
export class TenantDetailsComponent implements OnInit{

  selectUnit:boolean = false;
  searchTenant:boolean = false;
  foundTenant:boolean = false;
  token:any = localStorage.getItem("token")
  header:any = {"x-api-key":this.token}
  propertyId:any = localStorage.getItem("propertyId")
  selectedUnitId:any = ''
  tenantEmail:any = ''
  assignTenantText:any = ''

  constructor(
    private router:Router,
    private authService:AuthService
  ) {}

  units:any[] = []
  tenants:any[] = []

  propertyImg:any[] = [
    {
      image: '../assets/pexels-pixabay-277667/pexels-pixabay-277667.png',
      thumbImage:'../assets/pexels-pixabay-277667/pexels-pixabay-277667.png',
      alt:"img"
    },
    {
      image: '../assets/pexels-pixabay-277667/pexels-luis-yanez-206172.png',
      thumbImage:'../assets/pexels-pixabay-277667/pexels-luis-yanez-206172.png',
      alt:"img"
    },
    {
      image: '../assets/pexels-pixabay-277667/pexels-luis-yanez-206172.png',
      thumbImage:'../assets/pexels-pixabay-277667/pexels-luis-yanez-206172.png',
      alt:"img"
    }
  ]
  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    infinite: false,
  };

  ngOnInit() {
    this.authService.getUnit(this.propertyId,this.header).subscribe((response) => {
      // console.log(response.data)
      this.units = response.data
      this.authService.getTenant(this.units[0].id,this.header).subscribe((unitResponse) => {
        console.log(unitResponse.data[0])
        this.tenants = unitResponse.data
      })
    })

  }

  selectUnitId(){
    this.searchTenant = (!this.searchTenant)
    localStorage.setItem('unitId',this.selectedUnitId)
    // this.authService.getTenant(this.selectedUnitId,this.header).subscribe((response) => {
    //   this.tenants = response.data
    // })
  }

  searchTenantEmail(){
    this.authService.isTenantEmailExit(this.tenantEmail,this.header).subscribe((response) => {
      this.tenants = response.data
      this.foundTenant = (!this.foundTenant)
    })
  }

  addTenant(){
    this.selectUnit = (!this.selectUnit)
  }

  public assignTenant(){
    let tenantBody:any = {
      email:this.tenants[0].email,
      firstName:this.tenants[0].firstName,
      gender:this.tenants[0].gender,
    }
    localStorage.setItem("tenantEmail",this.tenants[0].email)
    localStorage.setItem("tenantFirstName",this.tenants[0].firstName)
    localStorage.setItem("tenantGender",this.tenants[0].gender)
    this.router.navigate(["/tenant/add"])
  }
}

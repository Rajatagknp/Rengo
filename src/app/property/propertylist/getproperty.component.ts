import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../authservices/authservice";
import {GlobalService} from "../../authservices/global.service";
import {SharedService} from "../../authservices/shared.service";

@Component({
  selector: 'app-root',
  templateUrl: './getproperty.component.html',
  styleUrls: ['./getproperty.component.scss']
})
export class GetPropertyComponent implements OnInit{
  constructor(
    private router:Router,
    private authService:AuthService,
    private sharedService:SharedService,
    private globalService:GlobalService
  ) {}

  header:any = {'x-api-key':localStorage.getItem('token')}
  properties:any[] = []
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
    this.globalService.info__()
    this.authService.get_property(this.header).subscribe((response) => {
      this.properties = response.data
      console.log(response.data)
    })
  }

  editProperty(value:any){
    this.sharedService.propertyEditIndex.next(value)
    this.router.navigate(["/property/edit"])
  }

  tenantDetails(value:any){
    this.sharedService.propertyEditIndex.next(value)
    localStorage.setItem("propertyId",value)
    this.router.navigate(["/tenant/details"])
  }

  cancelProperty(value:any){
    console.log(value)
  }



}

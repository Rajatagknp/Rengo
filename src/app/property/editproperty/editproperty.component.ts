import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { Options } from '@angular-slider/ngx-slider';
import {AuthService} from "../../authservices/authservice";
import {GlobalService} from "../../authservices/global.service";
import {SharedService} from "../../authservices/shared.service";


@Component({
  selector: 'app-root',
  templateUrl: './editproperty.component.html',
  styleUrls: ['./editproperty.component.scss']
})
export class EditPropertyComponent implements OnInit{

  constructor(
    private router:Router,
    private authService:AuthService,
    private sharedService:SharedService,
    private globalService:GlobalService
  ) {}
  addUnit:boolean = false

  header:any = {"x-api-key":localStorage.getItem("token")}
  properties:any = ''
  propertyName:any = ''
  propertyAddress:any = ''
  propertyType:any[] = []
  selectPropertyType:any = ''
  PropertyImgId:any[] = [{"documentId":""},{"documentId":""},{"documentId":""}];
  propertyImg:any[] = [
    {url:"../assets/add_property/Group%20305.svg",name:''},
    {url:"../assets/add_property/Group%20305.svg",name:''},
    {url:"../assets/add_property/Group%20305.svg",name:''},
  ]
  numberOfUnit:number[] = []
  unitName:any[] = []
  occupancyValue: number[] = [];
  body:any[] = [
    {url:"../assets/add_property/Group%20305.svg",name:''},
    {url:"../assets/add_property/Group%20305.svg",name:''},
    {url:"../assets/add_property/Group%20305.svg",name:''},
  ]
  unitImg:any[] = []
  unitRentCharge:any[] = []
  billType:any = 'Select Bill'
  unitBills:any[] = []

  selectBills:any[] = [[]]
  propertyId:any = ''
  unitId:any[] = []
  unitRentId:any[] = []

  ngOnInit() {
    this.globalService.info__();
    this.authService.get_property_type(this.header).subscribe((response) => {
      this.propertyType = response.data
    })
    this.authService.getRentType(this.header).subscribe((response) => {
      this.unitBills = response.data
    })
    this.authService.get_property(this.header).subscribe((response) => {
      let index = this.sharedService.propertyEditIndex.value
      if(index<0){
        this.router.navigate(["/property/list"])
      }else{
        this.propertyId = response.data[index].id
        this.properties = response.data[index]
        this.propertyName = this.properties.name
        this.propertyAddress = this.properties.address
        this.selectPropertyType = this.properties.propertyType.id
        response.data[index].propertyDocument.forEach((element:object,index:number) => {
          // @ts-ignore
          this.propertyImg[index].url = element.link;
          // @ts-ignore
          this.PropertyImgId[index].documentId = element.documentId
        })
        this.authService.getUnit(response.data[index].id,this.header).subscribe((unitResponse) => {
          for (let j=0;j<unitResponse.data.length;j++){
            this.numberOfUnit.push(j)
            this.unitName.push(unitResponse.data[j].name)
            this.occupancyValue.push(unitResponse.data[j].capacity)
            this.unitImg.push(this.body)
            this.unitId.push(unitResponse.data[j].id)
            this.authService.getRent(unitResponse.data[j].id,this.header).subscribe((rentResponse) => {
              rentResponse.data.forEach((element:any,index:any) => {
                if (element.id == "181cceaf-3dc5-479a-a781-37c2a539863b"){
                  this.unitRentCharge.push(element.amount)
                  this.unitRentId.push(element.id)
                }else{
                  this.selectBills[0].push(rentResponse.data[index])
                }
              })
            })
          }
        })
      }
    })
  }

  unitBillType:any[] = [
    {value_appears:'Actual',value:'false'},
    {value_appears:'Fixed',value:'true'},
  ]
  next(){
    this.addUnit = (!this.addUnit)
  }

  save(){
    let propertyBody = {
      "id":this.propertyId,
      "name" : this.propertyName,
      "address" : this.propertyAddress,
      "propertyType" : this.selectPropertyType,
      "documents" : this.PropertyImgId
    }
    this.authService.post_property(propertyBody,this.header).subscribe((response) => {
      console.log(response)
      for (let i=0;i<this.numberOfUnit.length;i++ ){
        let unitBody = {
          "name" : this.unitName[i],
          "capacity" : this.occupancyValue[i],
          "propertyId" : response.data.id,
          "id" : this.unitId[i],
        }
        // this.authService.postUnit(unitBody,this.header).subscribe((unitResponse) => {
        //   console.log(unitResponse)
        // })
      }
    })
    this.router.navigate(["/property/list"])
  }

  addMoreUnits(){
    this.unitName.push('')
    this.occupancyValue.push(1)
    this.unitImg.push(this.body)
    this.unitRentCharge.push('')
    this.selectBills.push([])
    this.numberOfUnit.push(this.numberOfUnit.length)
  }

  copyUnits(value:any){
    this.unitName.push(this.unitName[value])
    this.occupancyValue.push(this.occupancyValue[value])
    this.unitRentCharge.push(this.unitRentCharge[value])
    this.selectBills.push(this.selectBills[value])
    this.numberOfUnit.push(this.numberOfUnit.length)
    this.unitImg.push(this.unitImg[value])
  }

  deleteUnit(value:any){
    for(let i = 0; i <= this.unitName.length; i++){
      if ( i === value) {
        this.numberOfUnit.splice(i, 1);
        this.occupancyValue.splice(i, 1);
        this.selectBills.splice(i, 1);
        this.unitName.splice(i, 1);
        this.unitImg.splice(i, 1);
      }
    }
  }

  addMoreSelectBills(value:any){
    this.selectBills[value].push({name:'',type:'',value:''})
  }

  addBills(value2:any, value:any){
    let count = 0
    if(value2!='Select Bill'){
      if(!this.selectBills[value].length){
        this.selectBills[value].push({name:value2,type:'',value:''})
      }else {
        for(let j=0; j<this.selectBills[value].length; j++){
          if(value2==this.selectBills[value][j].name){
            count = 1
            break;
          }
        }
        if(!count){
          this.selectBills[value].push({name:value2,type:'',value:''})
        }
      }
    }
  }

  deleteBills(value:any, value2:any){
    for(let i = 0; i <= this.selectBills[value2].length; i++){
      if ( i === value) {
        this.selectBills[value2].splice(i, 1);
      }
    }
  }


  selectPropertyImg(...values:any[]) {
    let event = values[0]
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        // this.propertyImg[values[1]].url = event.target?.result;
      }
      this.propertyImg[values[1]].name = event.target.files[0].name
      let propertyBody = new FormData()
      propertyBody.append("file",event.target.files[0])
      propertyBody.append("type","property")
      this.authService.uploadDoc(propertyBody,this.header).subscribe((response) => {
        this.propertyImg[values[1]].id = response.data.documentId
        this.PropertyImgId[values[1]].documentId = response.data.documentId
        this.propertyImg[values[1]].url = response.data.url;
        console.log(response)
      })
    }
  }

  selectUnitImg(...values:any[]) {
    let event = values[0]
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.unitImg[values[1]][values[2]].url = event.target?.result;
      }
      this.unitImg[values[1]][values[2]].name = event.target.files[0].name;
    }
  }

  options: Options = {
    floor: 1,
    ceil: 9,
    hidePointerLabels:true,
    hideLimitLabels:true,
    showSelectionBar:true,
    getPointerColor: (value: number): string => {
      return '#6A63AC';
    },
    getSelectionBarColor:() => {
      return '#6A63AC';
    },
  };

}

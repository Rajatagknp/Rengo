import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { Options } from '@angular-slider/ngx-slider';
import {AuthService} from "../../authservices/authservice";
import {GlobalService} from "../../authservices/global.service";

@Component({
  selector: 'app-root',
  templateUrl: './addproperty.component.html',
  styleUrls: ['./addproperty.component.scss']
})
export class AddpropertyComponent implements OnInit{

  constructor(
    private router:Router,
    private authService:AuthService,
    private globalService:GlobalService
  ) {}

  addUnit:boolean = false
  isValidForm:boolean = false
  isValidUnit:boolean = false
  header:any = {"x-api-key":localStorage.getItem("token")}
  billType:any = 'Select Bill'
  unitBills:any[] = []

  ngOnInit() {
    this.globalService.info__();
    this.authService.get_property_type(this.header).subscribe((response) => {
      this.propertyType = response.data
    })
    this.authService.getRentType(this.header).subscribe((response) => {
      this.unitBills = response.data
    })
  }



  propertyName:any = ''
  propertyAddress:any = ''
  selectPropertyType:any = ''
  propertyType:any[] = []
  propertyImg:any[] = [
    {url:"../assets/add_property/Group%20305.svg",name:'',id:''},
    {url:"../assets/add_property/Group%20305.svg",name:'',id:''},
    {url:"../assets/add_property/Group%20305.svg",name:'',id:''},
  ]

  numberOfUnit:number[] = [0]
  unitName:any[] = ['']
  occupancyValue: number[] = [1];
  body:any[] = [
    {url:"../assets/add_property/Group%20305.svg",name:''},
    {url:"../assets/add_property/Group%20305.svg",name:''},
    {url:"../assets/add_property/Group%20305.svg",name:''},
  ]

  PropertyImgId:any[] = [
    {"documentId": 'e48030d0-dcc5-4953-b7e6-c6193bd2e0e3'},
    {"documentId": 'e48030d0-dcc5-4953-b7e6-c6193bd2e0e3'},
    {"documentId": 'e48030d0-dcc5-4953-b7e6-c6193bd2e0e3'}
  ];
  unitImg:any[] = [this.body]
  unitRentCharge:any[] = []

  unitBillType:any[] = [
    {value_appears:'Actual',value:true},
    {value_appears:'Fixed',value:false},
  ]
  selectBills:any[] = [[]]



  next(...values:any[]){
    this.isValidForm = true
    if(!this.addUnit){
      if(values[2].length>0){
        let compare = (JSON.stringify([false,false]) == JSON.stringify([values[0],values[1]]))
        if(compare){
          this.addUnit = (!this.addUnit)
        }
      }
    }else{
      this.addUnit = (!this.addUnit)
    }
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
    this.selectBills[value].push({typeId:'',unitId:'',isFixed:false,amount:0})
  }

  findBillName(value:any){
    let billNameFind = ''
    this.unitBills.find((element) => {
      if(element.id==value){
        billNameFind = element.name
      }
    })
    return billNameFind;
  }

  findBillId(value:any){
    let billId = ''
    this.unitBills.find((element) => {
      if(element.name==value){
        billId = element.id
      }
    })
    return billId;
  }

  addBills(value2:any, value:any){
    let count = 0
    if(value2!='Select Bill'){
      if(!this.selectBills[value].length){
        this.selectBills[value].push({typeId:value2,unitId:'',isFixed:false,amount:0})
      }else {
        for(let j=0; j<this.selectBills[value].length; j++){
          if(value2==this.selectBills[value][j].typeId){
            count = 1
            break;
          }
        }
        if(!count){
          this.selectBills[value].push({typeId:value2,unitId:'',isFixed:false,amount:0})
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
      this.propertyImg[values[1]].name = event.target.files[0].name
      let propertyBody = new FormData()
      propertyBody.append("file",event.target.files[0])
      propertyBody.append("type","property")
      this.authService.uploadDoc(propertyBody,this.header).subscribe((response) => {
        this.propertyImg[values[1]].id = response.data.documentId
        this.PropertyImgId[values[1]].documentId = response.data.documentId
        this.propertyImg[values[1]].url = response.data.url;
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

  save(){
    let propertyBody = {
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
        }
        this.authService.postUnit(unitBody,this.header).subscribe((unitResponse) => {
          let rentBody = this.selectBills
          rentBody[i].push({typeId:this.findBillId('rent'),unitId:'',isFixed:true,amount:this.unitRentCharge[i]})
          rentBody[i].forEach((element:any) => {
            element.unitId = unitResponse.data.id
          })
          console.log(rentBody[i])
          this.authService.postRent(rentBody[i],this.header).subscribe((rentResponse) => {
            console.log(rentResponse)
            this.router.navigate(["/property/list"])
          })
        })
      }
    })
  }

  options: Options = {
    floor: 1,
    ceil: 9,
    hidePointerLabels:true,
    hideLimitLabels:true,
    showSelectionBar:true,
    getPointerColor: (): string => {
      return '#6A63AC';
    },
    getSelectionBarColor:() => {
      return '#6A63AC';
    },
  };

}

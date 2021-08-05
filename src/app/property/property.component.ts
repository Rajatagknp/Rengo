import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../authservices/authservice";
import {GlobalService} from "../authservices/global.service";

@Component({
  selector: 'app-root',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit{
  title = 'Add Properties';
  constructor(
    private router:Router,
    private authservice:AuthService,
    private globalservice:GlobalService
  ) {}

  ngOnInit() {
    this.globalservice.info__()
  }

  continue(){
    this.router.navigate(["/property/add"])
  }
}

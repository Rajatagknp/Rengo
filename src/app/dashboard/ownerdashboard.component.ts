import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../authservices/authservice";
import {SharedService} from "../authservices/shared.service";
import { MultiDataSet, Label } from 'ng2-charts';
import { ChartType } from 'chart.js';


@Component({
  selector: 'app-root',
  templateUrl: './ownerdashboard.component.html',
  styleUrls: ['./ownerdashboard.component.scss']
})

export class OwnerdashboardComponent implements OnInit{

  total_payment:any = 1000;
  collected_payment:any = 300;
  progress_bar_style:any = `width: ${this.collected_payment*100/this.total_payment}%`

  propertyChartLabels: Label[] = ['Vacant', 'Occupied'];
  propertyChartData: MultiDataSet = [[5, 20]];
  tenantChartLabels: Label[] = ['Unpaid Rent', 'Paid Rent'];
  tenantChartData: MultiDataSet = [[5, 20]];
  ChartType: ChartType = 'doughnut';
  chartColors:Array<any> = [{
    backgroundColor: ['#CACACA', '#6A63AC']
  }]
  chartOptions = {
    cutoutPercentage: 80,
    legend: {
      display: false
    },
  };

  property_num_lab: Label[] = ['1', '2','3'];
  property_num_data: MultiDataSet = [[5, 20, 10]];


  ngOnInit() {  }
}

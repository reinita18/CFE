import { Component, OnInit } from '@angular/core';
import {ReportsService} from "../../services/reports.service"
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  reports: any = [];

  constructor(private reportsService:ReportsService) { }

  ngOnInit(): void {
    /*
    var aux = localStorage.getItem('numero');
    const params = this.activatedRoute.snapshot.params;
    this.reportsService.getReport(params[aux]).subscribe(
      
      res => {
        console.log(res)
        this.reports = res;

      },
      err => console.error(err)
    );*/

  }

  

}

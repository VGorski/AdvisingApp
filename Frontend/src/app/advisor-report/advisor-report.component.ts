import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-advisor-report',
  templateUrl: './advisor-report.component.html',
  styleUrls: ['./advisor-report.component.css']
})
export class AdvisorReportComponent implements OnInit {
  advisor_id = 3
  constructor() { }

  ngOnInit(): void {
  }

}

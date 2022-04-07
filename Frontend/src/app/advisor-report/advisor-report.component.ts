import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-advisor-report',
  templateUrl: './advisor-report.component.html',
  styleUrls: ['./advisor-report.component.css'],
})
export class AdvisorReportComponent implements OnInit {
  advisor_id = JSON.parse(localStorage.getItem('advisor_id') || '-1'); //TODO make this dependent upon who logged in
  constructor() {}

  ngOnInit(): void {}
  
}

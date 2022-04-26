// Authors: Timothy Carta and Victoria Gorski

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-advisor-report',
  templateUrl: './advisor-report.component.html',
  styleUrls: ['./advisor-report.component.css'],
})
export class AdvisorReportComponent implements OnInit {
  // Get the advisor's ID
  advisor_id = JSON.parse(localStorage.getItem('advisor_id') || '-1');
  constructor(private logoutRouter: Router) {}

  ngOnInit(): void {}

  // Log the user out
  logout() {
    console.log('Logging out');
    localStorage.removeItem('token');
    localStorage.removeItem('advisee_id');
    localStorage.removeItem('role');
    this.logoutRouter.navigate(['/']);
  }
}
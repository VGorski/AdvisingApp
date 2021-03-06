// Authors: Timothy Carta and Victoria Gorski

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetDataService } from '../services/get-data.service';

@Component({
  selector: 'app-advisor-view-advisees',
  templateUrl: './advisor-view-advisees.component.html',
  styleUrls: ['./advisor-view-advisees.component.css'],
})
export class AdvisorViewAdviseesComponent implements OnInit {
  // Get the information that corresponds to the advisor's ID
  advisor_id = JSON.parse(localStorage.getItem('advisor_id') || '-1');

  advisor = {
    firstName: '',
    lastName: '',
  };
  constructor(
    private getDataService: GetDataService,
    private logoutRouter: Router
  ) {}

  ngOnInit(): void {
    this.getDataService.getAdvisorName(this.advisor_id).subscribe((advisor) => {
      console.log(advisor);
      this.advisor = advisor;
    });
  }

  // Log the user out
  logout() {
    console.log('Logging out');
    localStorage.removeItem('token');
    localStorage.removeItem('advisee_id');
    this.logoutRouter.navigate(['/']);
  }
}
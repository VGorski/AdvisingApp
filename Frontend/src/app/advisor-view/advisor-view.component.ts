// Authors: Timothy Carta and Victoria Gorski

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetDataService } from '../services/get-data.service';

@Component({
  selector: 'app-advisor-view',
  templateUrl: './advisor-view.component.html',
  styleUrls: ['./advisor-view.component.css'],
})
export class AdvisorViewComponent implements OnInit {
  // Get an advisor's information based on their ID
  advisor_id = -1;

  advisor = {
    firstName: '',
    lastName: '',
  };

  constructor(
    private getDataService: GetDataService,
    private logoutRouter: Router
  ) {}

  ngOnInit(): void {
    this.getAdvisorId().then(() => {
      this.getDataService
        .getAdvisorName(this.advisor_id)
        .subscribe((advisor) => {
          this.advisor = advisor;
        });
    });
  }

  // Get the advisor's ID from the local storage
  async getAdvisorId() {
    this.advisor_id = await Number.parseInt(
      localStorage.getItem('advisor_id') || '-1'
    );
  }

  // Log the user out
  logout() {
    console.log('Logging out');
    localStorage.removeItem('token');
    localStorage.removeItem('advisee_id');
    localStorage.removeItem('role');
    this.logoutRouter.navigate(['/']);
  }
}
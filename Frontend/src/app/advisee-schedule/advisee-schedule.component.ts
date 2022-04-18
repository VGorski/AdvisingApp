// Authors: Timothy Carta and Victoria Gorski

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetDataService } from '../services/get-data.service';

@Component({
  selector: 'app-advisee-schedule',
  templateUrl: './advisee-schedule.component.html',
  styleUrls: ['./advisee-schedule.component.css'],
})
export class AdviseeScheduleComponent implements OnInit {
  // Get the advisee's ID and corresponding information
  advisee_id = JSON.parse(localStorage.getItem('advisee_id') || '-1');
  advisee = {
    firstName: '',
    lastName: '',
  };
  constructor(
    private getDataService: GetDataService,
    private logoutRouter: Router
  ) {}

  ngOnInit(): void {
    this.getAdviseeId().then(() => {
      this.getDataService
        .getAdviseeName(this.advisee_id)
        .subscribe((advisee) => {
          this.advisee = advisee;
        });
    });
  }

  // Get the advisee's ID from the local storage
  async getAdviseeId() {
    this.advisee_id = await Number.parseInt(
      localStorage.getItem('advisee_id') || '-1'
    );
  }

  // Log the user out
  logout() {
    console.log('Logging out');
    localStorage.removeItem('token');
    localStorage.removeItem('advisee_id');
    this.logoutRouter.navigate(['/']);
  }
}

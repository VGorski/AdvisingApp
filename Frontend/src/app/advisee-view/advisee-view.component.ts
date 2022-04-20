// Authors: Timothy Carta and Victoria Gorski

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetDataService } from '../services/get-data.service';

@Component({
  selector: 'app-advisee-view',
  templateUrl: './advisee-view.component.html',
  styleUrls: ['./advisee-view.component.css'],
})
export class AdviseeViewComponent implements OnInit {
  // Get the advisee's information based on their ID
  advisee_id = -1;

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

  // Get the advisee's ID
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
    localStorage.removeItem('role');
    this.logoutRouter.navigate(['/']);
  }
}

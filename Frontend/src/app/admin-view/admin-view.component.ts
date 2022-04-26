// Authors: Timothy Carta and Victoria Gorski

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetDataService } from '../services/get-data.service';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css'],
})
export class AdminViewComponent implements OnInit {
  // Currently only one admin exists in the system so the information is hardcoded
  // This will change if Professor Kiassat is no longer admin
  admin_id = JSON.parse(localStorage.getItem('advisor_id') || '-1');
  firstName = '';
  lastName = '';

  constructor(
    private getDataService: GetDataService,
    private logoutRouter: Router
  ) {}

  ngOnInit(): void {
    this.getDataService.getAdvisorName(this.admin_id).subscribe((name) => {
      this.firstName = name.firstName;
      this.lastName = name.lastName;
    });
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
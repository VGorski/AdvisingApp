import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css'],
})
export class AdminViewComponent implements OnInit {
  admin_id = JSON.parse(localStorage.getItem('advisor_id') || '-1'); //This will change if Professor Kiassat is no longer admin
  firstName = '';
  lastName = '';

  constructor(private dataService: DataService, private logoutRouter: Router) {}

  ngOnInit(): void {
    this.dataService.getAdvisorName(this.admin_id).subscribe((name) => {
      this.firstName = name.firstName;
      this.lastName = name.lastName;
    });
  }

  logout() {
    console.log('Logging out');
    localStorage.removeItem('token');
    localStorage.removeItem('advisee_id');
    localStorage.removeItem('role');
    this.logoutRouter.navigate(['/']);
  }
}

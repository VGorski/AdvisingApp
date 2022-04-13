import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-report',
  templateUrl: './admin-report.component.html',
  styleUrls: ['./admin-report.component.css'],
})
export class AdminReportComponent implements OnInit {
  constructor(private logoutRouter: Router) {}

  ngOnInit(): void {}

  logout() {
    console.log('Logging out');
    localStorage.removeItem('token');
    localStorage.removeItem('advisee_id');
    localStorage.removeItem('role');
    this.logoutRouter.navigate(['/']);
  }
}

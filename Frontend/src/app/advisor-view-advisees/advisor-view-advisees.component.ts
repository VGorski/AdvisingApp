import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetDataService } from '../services/get-data.service';

@Component({
  selector: 'app-advisor-view-advisees',
  templateUrl: './advisor-view-advisees.component.html',
  styleUrls: ['./advisor-view-advisees.component.css'],
})
export class AdvisorViewAdviseesComponent implements OnInit {
  advisor_id = JSON.parse(localStorage.getItem('advisor_id') || '-1'); //TODO make this dependent upon who logged in

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

  logout() {
    console.log('Logging out');
    localStorage.removeItem('token');
    localStorage.removeItem('advisee_id');
    this.logoutRouter.navigate(['/']);
  }
}

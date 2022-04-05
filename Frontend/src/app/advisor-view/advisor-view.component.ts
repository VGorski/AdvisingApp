import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-advisor-view',
  templateUrl: './advisor-view.component.html',
  styleUrls: ['./advisor-view.component.css'],
})
export class AdvisorViewComponent implements OnInit {
  advisor_id = -1; //TODO make this dependent upon who logged 


  advisor = {
    firstName: '',
    lastName: '',
  };

  constructor(private dataService: DataService, private logoutRouter: Router) {}

  ngOnInit(): void {

    this.getAdvisorId().then(() => {
      this.dataService.getAdvisorName(this.advisor_id).subscribe((advisor) => {
      this.advisor = advisor;
    })
    })
  }

  async getAdvisorId() {
    this.advisor_id = await Number.parseInt(localStorage.getItem('advisor_id') || "-1");
  }

  logout() {
    console.log("Logging out");
    localStorage.removeItem('token');
    localStorage.removeItem('advisee_id');
    localStorage.removeItem('role');
    this.logoutRouter.navigate(['/']);
  }
}

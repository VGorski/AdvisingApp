import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-advisor-list',
  templateUrl: './advisor-list.component.html',
  styleUrls: ['./advisor-list.component.css'],
})
export class AdvisorListComponent implements OnInit {
  advisors = [
    {
      advisor_id: -1,
      firstName: '',
      lastName: '',
      flagged: false,
    },
  ];

  constructor(private dataservice: DataService) {}

  ngOnInit(): void {
    this.advisors.pop();
    this.dataservice.getAllAdvisors().subscribe((advisors) => {
      this.advisors = advisors;
    });
  }

  flagAdvisor(advisor: any) {
    advisor.flagged = true;
  }
}

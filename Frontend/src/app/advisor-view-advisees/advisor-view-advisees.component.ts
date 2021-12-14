import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-advisor-view-advisees',
  templateUrl: './advisor-view-advisees.component.html',
  styleUrls: ['./advisor-view-advisees.component.css']
})
export class AdvisorViewAdviseesComponent implements OnInit {
  advisor_id = 3; //TODO make this dependent upon who logged in

  advisor = {
    "firstName": "",
    "lastName": ""
  }
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getAdvisorName(this.advisor_id).subscribe((advisor) => {
      console.log(advisor);
      this.advisor = advisor
    })
  }

}

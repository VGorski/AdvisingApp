import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-advisor-view',
  templateUrl: './advisor-view.component.html',
  styleUrls: ['./advisor-view.component.css']
})
export class AdvisorViewComponent implements OnInit {
  advisor_id = 4; //TODO make this dependent upon who logged in

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

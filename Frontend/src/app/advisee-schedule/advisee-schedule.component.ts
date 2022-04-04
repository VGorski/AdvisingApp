import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-advisee-schedule',
  templateUrl: './advisee-schedule.component.html',
  styleUrls: ['./advisee-schedule.component.css']
})
export class AdviseeScheduleComponent implements OnInit {

  advisee_id = -1
  advisee = {
    "firstName": "",
    "lastName": ""
  }
  constructor(private dataService: DataService) { }

  ngOnInit(): void {


    this.getAdviseeId().then(() => {
      this.dataService.getAdviseeName(this.advisee_id).subscribe((advisee) => {
      this.advisee = advisee;
    })
    })
  }

  
  
  async getAdviseeId() {
    this.advisee_id = await Number.parseInt(localStorage.getItem('advisee_id') || "-1");
  }

}

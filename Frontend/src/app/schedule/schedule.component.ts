import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  constructor(private dataService: DataService) { }

  @Input() advisee_id: number = 0

  courses = [{
    "name": ""
  }]

  ngOnInit(): void {
    this.dataService.getCourses(this.advisee_id).subscribe((courses) => {
      this.courses = courses
    })
  }

}

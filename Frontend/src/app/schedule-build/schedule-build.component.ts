import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { DataService } from '../data.service';


@Component({
  selector: 'app-schedule-build',
  templateUrl: './schedule-build.component.html',
  styleUrls: ['./schedule-build.component.css']
})
export class ScheduleBuildComponent implements OnInit {

  advisee_id = 2;
  filter = "";
  disciplines = [{
    "discipline": ""
  }];

  available_courses = [{
    "course_id": -1,
    "name": "",
  }];

  chosen_courses = [{
    "course_id": -1,
    "name": "",
  }];

  scheduleForm = {
    "advisee_id": this.advisee_id,
    "modified_date": new Date().toISOString().slice(0, 10), //todays date
    "adviseeSignature": "",
    "advisorSignature": ""
  }
  
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.available_courses.pop()
    this.chosen_courses.pop()

    this.dataService.getAvailableCourses(this.filter).subscribe((courses) => {
      this.available_courses = courses
    })

    this.dataService.getDisciplines().subscribe((disciplines) => {
      this.disciplines = disciplines
    })
  }

  getFilteredCourses() {
    this.dataService.getAvailableCourses(this.filter).subscribe((courses) => {
      this.available_courses = courses
    })
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  submit() {
    this.dataService.postSchedule(this.advisee_id, this.scheduleForm, this.chosen_courses).subscribe((res) => {
      console.log(res);
    })
  }
}
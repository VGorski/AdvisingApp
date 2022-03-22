import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { DataService } from '../data.service';


@Component({
  selector: 'app-schedule-build',
  templateUrl: './schedule-build.component.html',
  styleUrls: ['./schedule-build.component.css'],
})
export class ScheduleBuildComponent implements OnInit {
  advisee_id = -1;

  advisee = {
    firstName: '',
    lastName: '',
  };

  filter = '';
  disciplines = [
    {
      discipline: '',
    },
  ];

  available_courses = [
    {
      course_id: -1,
      name: '',
    },
  ];

  chosen_courses = [
    {
      course_id: -1,
      name: '',
    },
  ];

  taken_courses = [
    {
      course_id: -1,
      name: '',
    },
  ];

  scheduleForm = {
    advisee_id: this.advisee_id,
    modified_date: new Date().toISOString().slice(0, 10), //todays date
    adviseeSignature: '',
    advisorSignature: '',
  };

  displayFillData = false;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.advisee_id = this.dataService.getSelectedAdvisee();
    this.scheduleForm.advisee_id = this.advisee_id;

    this.available_courses.pop();
    this.chosen_courses.pop();
    this.taken_courses.pop();

    this.dataService.getCourses(this.advisee_id).subscribe((courses) => {
      this.chosen_courses = courses;
    });

    this.dataService.getAvailableCourses(this.filter).subscribe((courses) => {
      this.available_courses = courses;
    });

    this.dataService.getTakenCourses(this.advisee_id).subscribe((courses) => {
      this.taken_courses = courses;
    });

    this.dataService.getDisciplines().subscribe((disciplines) => {
      this.disciplines = disciplines;
    });

    this.dataService.getAdviseeName(this.advisee_id).subscribe((advisee) => {
      this.advisee = advisee;
    });
  }

  getFilteredCourses() {
    this.dataService.getAvailableCourses(this.filter).subscribe((courses) => {
      this.available_courses = courses;
    });
  }

  hasCourseBeenTaken(course_id: number) {
    return (
      this.taken_courses.filter((course) => {
        return course.course_id == course_id;
      }).length != 0
    );
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  submit() {
    if (
      this.scheduleForm.adviseeSignature != '' &&
      this.scheduleForm.advisorSignature != ''
    ) {
      this.dataService
        .postSchedule(this.advisee_id, this.scheduleForm, this.chosen_courses)
        .subscribe((res) => {
          this.dataService.getCourses(this.advisee_id).subscribe((courses) => {
            this.chosen_courses = courses;
            this.scheduleForm.adviseeSignature = '';
            this.scheduleForm.advisorSignature = '';
          });
        });
    } else {
      this.displayFillData = true;
      setTimeout(() => {
        this.displayFillData = false;
      }, 5000);
    }
  }
}

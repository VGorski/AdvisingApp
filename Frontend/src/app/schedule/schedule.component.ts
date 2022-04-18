// Authors: Timothy Carta and Victoria Gorski

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GetDataService } from '../services/get-data.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
})
export class ScheduleComponent implements OnInit {
  constructor(private getDataService: GetDataService) {}

  // Get an advisee's schedule
  @Input() advisee_id: number = 0;
  @Input() advisingPeriodInProgress: boolean = false;
  @Input() adviseeView = false;
  @Output() flagAdvisee = new EventEmitter();

  flagged = false;

  // Template for getting an advisee's planned course
  plannedCourses = [
    {
      course_id: -1,
      name: '',
    },
  ];

  // Template for getting an advisee's registered course
  registeredCourses = [
    {
      course_id: -1,
      name: '',
    },
  ];

  // Template for if the course matches the course that was planned on the schedule
  correctCourses = [
    {
      course_id: -1,
      name: '',
    },
  ];

  ngOnInit(): void {
    this.plannedCourses.pop();
    this.registeredCourses.pop();

    this.getDataService
      // Get an advisee's registered courses
      .getRegisteredCourses(this.advisee_id)
      .subscribe((registeredCourses) => {
        this.registeredCourses = registeredCourses;
        // Get an advisee's planned courses
        this.getDataService.getCourses(this.advisee_id).subscribe((courses) => {
          this.plannedCourses = courses;
          if (courses.length == 0) {
            this.tellParent();
          }
          // Check if the courses match between the planned and registered schedules
          this.correctCourses = this.plannedCourses.filter((course: any) => {
            return this.plannedAndRegistered(course);
          });
        });
      });
  }

  // Flag the course if it is not part of the planned schedule
  tellParent() {
    if (!this.flagged) {
      this.flagged = true;
      this.flagAdvisee.emit();
    }
  }

  // Return true if a course was planned and also registered for
  plannedAndRegistered(course: any) {
    if (
      this.plannedCourses.filter((planned) => {
        return planned.course_id == course.course_id;
      }).length > 0 &&
      this.registeredCourses.filter((registered) => {
        return registered.course_id == course.course_id;
      }).length > 0
    ) {
      // Cut out the correctly planned courses
      let element: any = this.plannedCourses.splice(
        this.plannedCourses.indexOf(course.course_id),
        1
      );
      this.registeredCourses.splice(
        this.registeredCourses.indexOf(course.course_id),
        1
      );
      // Put the courses into the correct courses array
      this.correctCourses.push(element);
      return true;
    }
    if (!this.adviseeView) {
      this.tellParent();
    }
    return false;
  }
}

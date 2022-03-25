import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
})
export class ScheduleComponent implements OnInit {
  constructor(private dataService: DataService) {}

  @Input() advisee_id: number = 0;
  @Input() advisingPeriodInProgress: boolean = false;
  @Output() flagAdvisee = new EventEmitter();

  flagged = false;

  plannedCourses = [
    {
      course_id: -1,
      name: '',
    },
  ];

  registeredCourses = [
    {
      course_id: -1,
      name: '',
    },
  ];

  ngOnInit(): void {
    this.plannedCourses.pop();
    this.registeredCourses.pop();

    this.dataService
      .getRegisteredCourses(this.advisee_id)
      .subscribe((registeredCourses) => {
        this.registeredCourses = registeredCourses;
      });

    this.dataService.getCourses(this.advisee_id).subscribe((courses) => {
      this.plannedCourses = courses;
      if (courses.length == 0) {
        this.tellParent();
      }
    });
  }

  tellParent() {
    if (!this.flagged) {
      this.flagged = true;
      this.flagAdvisee.emit();
    }
  }

  // Return true if a course has been registered for but was not planned during an advising meeting
  registeredNotPlanned(course_id: number) {
    if (
      this.plannedCourses.filter((course) => {
        return course.course_id == course_id;
      }).length != 0 &&
      this.registeredCourses.filter((course) => {
        return course.course_id == course_id;
      }).length == 0
    ) {
      this.tellParent();
      return true;
    }
    return false;
  }

  // Return true if a course was planned during an advising meeting but has not been registered for
  plannedNotRegistered(course_id: number) {
    if (
      this.plannedCourses.filter((course) => {
        return course.course_id == course_id;
      }).length == 0 &&
      this.registeredCourses.filter((course) => {
        return course.course_id == course_id;
      }).length != 0
    ) {
      this.tellParent();
      return true;
    }
    return false;
  }

  // Return true if a student has not registered nor attended an advising meeting
  neitherPlannedNorRegistered(course_id: number) {
    if (
      this.plannedCourses.filter((course) => {
        return course.course_id == course_id;
      }).length == 0 &&
      this.registeredCourses.filter((course) => {
        return course.course_id == course_id;
      }).length == 0
    ) {
      this.tellParent();
      return true;
    }
    return false;
  }

  // Return true if a course was planned and also registered for
  plannedAndRegistered(course_id: number) {
    if (
      this.plannedCourses.filter((course) => {
        return course.course_id == course_id;
      }).length > 0 &&
      this.registeredCourses.filter((course) => {
        return course.course_id == course_id;
      }).length > 0
    ) {
      return true;
    }
    this.tellParent();
    return false;
  }
}

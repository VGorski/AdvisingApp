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
  @Input() adviseeView = false;
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

  correctCourses = [
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

        this.dataService.getCourses(this.advisee_id).subscribe((courses) => {
          this.plannedCourses = courses;
          if (courses.length == 0) {
            this.tellParent();
          }

          this.correctCourses = this.plannedCourses.filter((course: any) => {
            return this.plannedAndRegistered(course);
          });

          console.log(this.correctCourses);
        });
      });
  }

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
      //Cut out the correctly planned courses
      let element: any = this.plannedCourses.splice(
        this.plannedCourses.indexOf(course.course_id),
        1
      );
      this.registeredCourses.splice(
        this.registeredCourses.indexOf(course.course_id),
        1
      );
      //put the courses into the correct courses array
      this.correctCourses.push(element);
      return true;
    }
    if (!this.adviseeView) {
      this.tellParent();
    }
    return false;
  }
}

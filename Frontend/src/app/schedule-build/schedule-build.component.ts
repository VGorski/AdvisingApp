// Authors: Timothy Carta and Victoria Gorski

import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { GetDataService } from '../services/get-data.service';
import { PostDataService } from '../services/post-data.service';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-schedule-build',
  templateUrl: './schedule-build.component.html',
  styleUrls: ['./schedule-build.component.css'],
})
export class ScheduleBuildComponent implements OnInit {
  // Template for getting the advisee's information
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

  // Create the advisee's schedule
  scheduleForm = {
    advisee_id: this.advisee_id,
    // Today's date
    modified_date: new Date().toISOString().slice(0, 10),
    adviseeSignature: '',
    advisorSignature: '',
  };

  displayFillData = false;

  constructor(
    private getDataService: GetDataService,
    private postDataService: PostDataService,
    private storageService: StorageService,
    private logoutRouter: Router
  ) {}

  ngOnInit(): void {
    // Get the chosen advisee
    this.advisee_id = this.storageService.getSelectedAdvisee();
    this.scheduleForm.advisee_id = this.advisee_id;

    this.available_courses.pop();
    this.chosen_courses.pop();
    this.taken_courses.pop();

    // Get an advisee's chosen courses
    this.getDataService.getCourses(this.advisee_id).subscribe((courses) => {
      this.chosen_courses = courses;
    });

    // Get the list of courses available to the advisee
    this.getDataService
      .getAvailableCourses(this.filter)
      .subscribe((courses) => {
        this.available_courses = courses;
      });

    // Get the courses already taken by the advisee
    this.getDataService
      .getTakenCourses(this.advisee_id)
      .subscribe((courses) => {
        this.taken_courses = courses;
      });

    // Get the discipline of each course
    this.getDataService.getDisciplines().subscribe((disciplines) => {
      this.disciplines = disciplines;
    });

    // Get the advisee's name
    this.getDataService.getAdviseeName(this.advisee_id).subscribe((advisee) => {
      this.advisee = advisee;
    });
  }

  // Filter the courses based on the selected filter
  getFilteredCourses() {
    this.getDataService
      .getAvailableCourses(this.filter)
      .subscribe((courses) => {
        this.available_courses = courses;
      });
  }

  // Check if the course has been taken by the advisee
  hasCourseBeenTaken(course_id: number) {
    return (
      this.taken_courses.filter((course) => {
        return course.course_id == course_id;
      }).length != 0
    );
  }

  // Controls the drag - and - drop functionality when building a schedule
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

  // Submit the built schedule when done
  submit() {
    if (
      // Check if the signature boxes have been filled
      this.scheduleForm.adviseeSignature != '' &&
      this.scheduleForm.advisorSignature != ''
    ) {
      // Save the schedule into the database
      this.postDataService
        .postSchedule(this.advisee_id, this.scheduleForm, this.chosen_courses)
        .subscribe((res) => {
          this.getDataService.getCourses(this.advisee_id).subscribe(() => {
            this.scheduleForm.adviseeSignature = '';
            this.scheduleForm.advisorSignature = '';

            document.getElementById('confirmModal')?.click();
          });
        });
    } else {
      this.displayFillData = true;
      setTimeout(() => {
        this.displayFillData = false;
      }, 5000);
    }
  }

  // Log the user out
  logout() {
    console.log('Logging out');
    localStorage.removeItem('token');
    localStorage.removeItem('advisee_id');
    this.logoutRouter.navigate(['/']);
  }
}
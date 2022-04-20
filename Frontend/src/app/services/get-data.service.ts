// Authors: Timothy Carta and Victoria Gorski

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URLHolderService } from './urlholder.service';

@Injectable({
  providedIn: 'root',
})
export class GetDataService {
  url: string;
  constructor(private http: HttpClient, urlHolder: URLHolderService) {
    this.url = urlHolder.URL;
  }

  // Get all of the advisees under a specific advisor
  getAdvisees(advisor_id: number): Observable<any> {
    return this.http.get(this.url + '/advisor/' + advisor_id + '/advisees');
  }

  // Get the first and last name of the specified advisee
  getAdviseeName(advisee_id: number): Observable<any> {
    return this.http.get(this.url + '/advisee/' + advisee_id + '/name');
  }

  // Get all advisors that exist in the system
  getAllAdvisors(): Observable<any> {
    return this.http.get(this.url + '/advisor/all');
  }

  // Get the first and last name of the specified advisor
  getAdvisorName(advisor_id: number): Observable<any> {
    return this.http.get(this.url + '/advisor/' + advisor_id + '/name');
  }

  // Get the courses that the specified advisee has planned
  getCourses(advisee_id: number): Observable<any> {
    return this.http.get(this.url + '/advisee/' + advisee_id + '/schedule');
  }

  // Get the courses that the specified advisee has previously taken
  getTakenCourses(advisee_id: number): Observable<any> {
    return this.http.get(
      this.url + '/advisee/' + advisee_id + '/taken-courses'
    );
  }

  // Get the courses that the specified advisee has registered for
  getRegisteredCourses(advisee_id: number): Observable<any> {
    return this.http.get(
      this.url + '/advisee/' + advisee_id + '/registered-courses'
    );
  }

  // Return the status of the files
  fileStatus(): Observable<any> {
    return this.http.get(`${this.url}/files`);
  }

  // Set all uploaded files as empty when switching to the admin file upload page
  async getUploadedFiles() {
    let data = {
      math: '',
      engineering: '',
      uc: '',
      all: '',
      studentFaculty: '',
      registered: '',
    };

    // Get the file containing the uploaded math courses
    await this.http.get(this.url + '/admin/files/math').subscribe((file) => {
      data.math = file.toString();
    });

    // Get the file containing the uploaded engineering courses
    await this.http
      .get(this.url + '/admin/files/engineering')
      .subscribe((file) => {
        data.engineering = file.toString();
      });

    // Get the file containing the uploaded UC courses
    await this.http
      .get(this.url + '/admin/files/ucCourses')
      .subscribe((file) => {
        data.uc = file.toString();
      });

    // Get the file containing all the uploaded courses  
    await this.http
      .get(this.url + '/admin/files/allCourses')
      .subscribe((file) => {
        data.all = file.toString();
      });

    // Get the file containing all the advisors and advisees  
    await this.http
      .get(this.url + '/admin/files/studentsFaculty')
      .subscribe((file) => {
        data.studentFaculty = file.toString();
      });

    // Get the file containing all the advisees' registered courses
    await this.http
      .get(this.url + '/admin/files/registered')
      .subscribe((file) => {
        data.registered = file.toString();
      });

    return data;
  }

  // Get the courses that fall under the specified discipline
  getAvailableCourses(discipline: string): Observable<any> {
    if (discipline == 'No Filter') {
      return this.http.get(this.url + '/courses/');
    } else {
      return this.http.get(this.url + '/courses/' + discipline);
    }
  }

  // Gets the list of all available disciplines
  getDisciplines(): Observable<any> {
    return this.http.get(this.url + '/courses/disciplines');
  }
}

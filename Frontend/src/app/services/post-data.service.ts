import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URLHolderService } from './urlholder.service';

@Injectable({
  providedIn: 'root',
})
export class PostDataService {
  url: string;
  constructor(private http: HttpClient, urlHolder: URLHolderService) {
    this.url = urlHolder.URL;
  }

  // Posts the planned schedule for the specified advisee
  postSchedule(
    advisee_id: number,
    scheduleForm: any,
    chosen_courses: any
  ): Observable<any> {
    let body = {
      scheduleForm,
      chosen_courses,
    };
    console.log(body);
    return this.http.post(
      this.url + '/advisee/' + advisee_id + '/schedule',
      body
    );
  }

  // Post the courses provided by the file uploaded by the administrator
  async postUCCourses(data: any) {
    // Pull the info that pertains to the course
    let courseData = data.map((element: any) => {
      return {
        name: element['Number'],
        discipline: element['UC Area'],
        iCourse: 1 ? element['I-Course?'] == 'Yes' : 0,
      };
    });

    this.http.post(this.url + '/admin/upload/courses', courseData).subscribe();
  }

  // Posts the math courses from the uploaded math file
  async postMathCourses(data: any) {
    let courseData = data.map((element: any) => {
      return {
        name: element['Sec Name'],
        discipline: 'MA',
        iCourse: 0,
      };
    });

    this.http.post(this.url + '/admin/upload/courses', courseData).subscribe();
  }

  // Posts the engineering courses from the uploaded engineering courses file
  async postEngineeringCourses(data: any) {
    let courseData = data.map((element: any) => {
      return {
        name: element['Crs Name'],
        discipline: element['Crs Name'].split(' ')[0],
        iCourse: 0,
      };
    });

    let chunkSize = 100;
    for (let i = 0; i < courseData.length; i += chunkSize) {
      let splitData = courseData.slice(i, i + chunkSize);
      this.http.post(this.url + '/admin/upload/courses', splitData).subscribe();
    }
  }

  // Posts the registered courses from the uploaded registered courses file
  async postRegisteredCourses(data: any) {
    //Reformat data to be like the MySQL database
    console.log('Working');
    let courseData = data.map((element: any) => {
      return {
        course: element['Course Name'],
        firstName: element['First Name'],
        lastName: element['Last Name'],
      };
    });

    this.http
      .post(this.url + '/admin/upload/registeredCourses', courseData)
      .subscribe();
  }

  // Post all of the user info for advisors and advisees
  // Creates the relationship between advisor and advisee
  async postBatchUserInfo(data: any) {
    // Pull the info that pertains to the advisors
    let advisorData = data.map((element: any) => {
      return {
        firstName: element['Adv First Name'],
        lastName: element['Adv Last Name'],
        email: element['Advisor Email'],
        discipline: element['discipline'],
      };
    });

    // Get unique advisors
    let uniqueAdvisorData = [...new Set(advisorData.map(JSON.stringify))].map(
      (element: any) => {
        return JSON.parse(element);
      }
    );

    // Pull the info that pertains to the advisees
    let adviseeData = data.map((element: any) => {
      return {
        advisorEmail: element['Advisor Email'],
        firstName: element['Student First Name'],
        lastName: element['Student Last Name'],
        email: element['Qu Email'],
        discipline: element['discipline'],
      };
    });

    // Get unique advisees
    let uniqueAdviseeData = [...new Set(adviseeData.map(JSON.stringify))].map(
      (element: any) => {
        return JSON.parse(element);
      }
    );

    let takenCourseData = data.map((element: any) => {
      let course = element['Course'];
      if (course) {
        course = course.replace('*', ' ');
      }
      return {
        course: course,
        email: element['Qu Email'],
      };
    });

    // Send the advisor information to the backend
    await this.http
      .post(this.url + '/admin/upload/advisors', uniqueAdvisorData)
      .subscribe();

    // Send the advisee information to the backend
    await this.http
      .post(this.url + '/admin/upload/advisees', uniqueAdviseeData)
      .subscribe();

    // This fixes the race condition between the advisee being added and the courses requiring the advisee_id
    setTimeout(async () => {
      // Send the courses taken information to the backend
      await this.http
        .post(this.url + '/admin/upload/takenCourses', takenCourseData)
        .subscribe();
    }, 2000);
  }

  // Sets the file to an uploaded state
  markFileAsUploaded(fileType: string) {
    this.http.post(this.url + '/admin/files/', { fileType }).subscribe();
    /*
      This can be: 
        mathCourses
        engineeringCourses
        ucCourses
        allCourses
        studentsFaculty
        registeredCourses
    */
  }
}

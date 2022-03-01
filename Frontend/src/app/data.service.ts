import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  url = 'http://localhost:3000';
  headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
  });

  constructor(private http: HttpClient) {}

  // Upload files
  fileUpload(file: File): Observable<HttpEvent<any>> {
    const dataForm: FormData = new FormData();
    dataForm.append('file', file);
    const req = new HttpRequest('POST', `${this.url}/upload`, dataForm, {responseType: 'json'});
    return this.http.request(req);
  }

  // Return the status of the files
  fileStatus(): Observable<any> {
    return this.http.get(`${this.url}/files`);
  }


  getAdvisees(advisor_id: number): Observable<any> {
    return this.http.get(this.url + '/advisor/' + advisor_id + '/advisees');
  }

  getAdviseeName(advisee_id: number): Observable<any> {
    return this.http.get(this.url + '/advisee/' + advisee_id + '/name');
  }

  getAdvisorName(advisor_id: number): Observable<any> {
    return this.http.get(this.url + '/advisor/' + advisor_id + '/name');
  }

  getCourses(advisee_id: number): Observable<any> {
    return this.http.get(this.url + '/advisee/' + advisee_id + '/schedule');
  }

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
  postCourses(data: any) {
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

  getAvailableCourses(discipline: string): Observable<any> {
     if (discipline == '') {
      return this.http.get(this.url + '/courses/');
    }
    else {
      return this.http.get(this.url + '/courses/' + discipline);
    }
  }

  getDisciplines(): Observable<any> {
    return this.http.get(this.url + '/courses/disciplines');
  }
}

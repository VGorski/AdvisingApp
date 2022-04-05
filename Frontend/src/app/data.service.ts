import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  url = 'https://quinnipiac-advising-assistant.herokuapp.com';
  headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
  });

  constructor(private http: HttpClient) {}

  // Upload files
  fileUpload(file: File): Observable<HttpEvent<any>> {
    const dataForm: FormData = new FormData();
    dataForm.append('file', file);
    const req = new HttpRequest('POST', `${this.url}/upload`, dataForm, {
      responseType: 'json',
    });
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

  getAllAdvisors(): Observable<any> {
    return this.http.get(this.url + '/advisor/all');
  }

  getAdvisorName(advisor_id: number): Observable<any> {
    return this.http.get(this.url + '/advisor/' + advisor_id + '/name');
  }

  getCourses(advisee_id: number): Observable<any> {
    return this.http.get(this.url + '/advisee/' + advisee_id + '/schedule');
  }

  getTakenCourses(advisee_id: number): Observable<any> {
    return this.http.get(
      this.url + '/advisee/' + advisee_id + '/taken-courses'
    );
  }

  getRegisteredCourses(advisee_id: number): Observable<any> {
    return this.http.get(
      this.url + '/advisee/' + advisee_id + '/registered-courses'
    );
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

  async postRegisteredCourses(data: any) {
    //Reformat data to be like the MySQL database
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

  async getUploadedFiles() {
    let data = {
      math: '',
      engineering: '',
      uc: '',
      all: '',
      studentFaculty: '',
      registered: '',
    };

    await this.http.get(this.url + '/admin/files/math').subscribe((file) => {
      data.math = file.toString();
    });
    await this.http
      .get(this.url + '/admin/files/engineering')
      .subscribe((file) => {
        data.engineering = file.toString();
      });
    await this.http
      .get(this.url + '/admin/files/ucCourses')
      .subscribe((file) => {
        data.uc = file.toString();
      });
    await this.http
      .get(this.url + '/admin/files/allCourses')
      .subscribe((file) => {
        data.all = file.toString();
      });
    await this.http
      .get(this.url + '/admin/files/studentsFaculty')
      .subscribe((file) => {
        data.studentFaculty = file.toString();
      });
    await this.http
      .get(this.url + '/admin/files/registered')
      .subscribe((file) => {
        data.registered = file.toString();
      });

    return data;
  }

  getAvailableCourses(discipline: string): Observable<any> {
    if (discipline == 'No Filter') {
      return this.http.get(this.url + '/courses/');
    } else {
      return this.http.get(this.url + '/courses/' + discipline);
    }
  }

  getDisciplines(): Observable<any> {
    return this.http.get(this.url + '/courses/disciplines');
  }

  changePassword(user_id: number, newPassword: string) {
    let data = {
      id: user_id,
      password: newPassword,
    };
    this.http.post(this.url + '/login/changePassword', data).subscribe();
  }

  //Acts as a holder for the selected advisee of the advisor
  selectedAdvisee = -1;
  getSelectedAdvisee() {
    return this.selectedAdvisee;
  }
  setSelectedAdvisee(advisee_id: number) {
    this.selectedAdvisee = advisee_id;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService{

  url = "http://localhost:3000"

  constructor(private http: HttpClient) { }

  getAdvisees(advisor_id: number): Observable<any> {
    return this.http.get(this.url + "/advisor/" + advisor_id + "/advisees")
  }

  getAdviseeName(advisee_id: number): Observable<any> {
    return this.http.get(this.url + "/advisee/" + advisee_id + "/name")
  }

  getAdvisorName(advisor_id: number): Observable<any> {
    return this.http.get(this.url + "/advisor/" + advisor_id + "/name")
  }

  getCourses(advisee_id: number): Observable<any> {
    return this.http.get(this.url + "/advisee/" + advisee_id + "/schedule")
  }

  postSchedule(advisee_id: number, scheduleForm: any, chosen_courses: any): Observable<any> {
    let body = {
      scheduleForm,
      chosen_courses
    }
    console.log(body);
    return this.http.post(this.url + "/advisee/" + advisee_id + "/schedule", body)
  }

  getAvailableCourses(discipline: string): Observable<any> {
    if (discipline == "No Filter") {
      return this.http.get(this.url + "/courses/")
    }
    else {
      return this.http.get(this.url + "/courses/" + discipline)
    }
  }

  getDisciplines(): Observable<any> {
    return this.http.get(this.url + "/courses/disciplines")
  }
}

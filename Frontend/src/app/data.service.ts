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

  getCourses(advisee_id: number): Observable<any> {
    return this.http.get(this.url + "/advisee/" + advisee_id + "/schedule")
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

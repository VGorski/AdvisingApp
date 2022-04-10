import { Injectable } from '@angular/core';
import { Handler } from './interface/handler';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AdviseeDashboardComponent } from './advisee-dashboard/advisee-dashboard.component';
import { Token } from '@angular/compiler';
import { observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  constructor(private http: HttpClient) {}

  headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With"
  });

  // Set token in local storage
  storeJWT(handler: Handler) {
  
 if (handler.hasOwnProperty('data')) {
   if (handler.data.role == 'ADVISOR' || handler.data.role == 'ADMIN') {
     localStorage.setItem('token', handler.data.token);
     localStorage.setItem('advisor_id', handler.data.id);
     localStorage.setItem('role', handler.data.role);
     //console.log(localStorage);
   } else {
     localStorage.setItem('token', handler.data.token);
     localStorage.setItem('advisee_id', handler.data.id);
     //console.log(localStorage);
   }   }

      
    
  }

  // Login API
  login(credentials: any) {
    return this.http.post<Handler>('http://localhost:3000/api/users/login', credentials, {headers: this.headers}).pipe(
      tap(async (res) => {
        await this.storeJWT(res);
      })
    )
  }
};



// User credentials API
/* getCredentials() {
  const jwt = localStorage.getItem('token');
  return this.http.get('http://localhost:3000/api/users/userCredentials', {headers: new HttpHeaders ({
    'Content-Type':'application/json',
    Authorization: `Bearer ${jwt}`
  })}).pipe(
    catchError((error) => {
      return new observable((res) =>
      {const reqValues = {
        message: error.statusText,
        status: error.status
      };

      res.next(reqValues);
    })})
  )
} */


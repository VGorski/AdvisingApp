// Authors: Timothy Carta and Victoria Gorski

import { Injectable } from '@angular/core';
import { Handler } from '../interface/handler';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URLHolderService } from './urlholder.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  url: string;

  constructor(private http: HttpClient, urlHolder: URLHolderService) {
    this.url = urlHolder.URL;
  }

  headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
    'Access-Control-Allow-Headers':
      'Content-Type, Authorization, X-Requested-With',
  });

  // Set token in local storage
  storeJWT(handler: Handler) {
    if (handler.hasOwnProperty('data')) {
      // Check the role of the user
      if (handler.data.role == 'ADVISOR' || handler.data.role == 'ADMIN') {
        localStorage.setItem('token', handler.data.token);
        localStorage.setItem('advisor_id', handler.data.id);
        localStorage.setItem('role', handler.data.role);
      } else {
        localStorage.setItem('token', handler.data.token);
        localStorage.setItem('advisee_id', handler.data.id);
      }
    }
  }

  // Login API
  login(credentials: any) {
    return this.http
      .post<Handler>(this.url + '/api/users/login', credentials, {
        headers: this.headers,
      })
      .pipe(
        tap(async (res) => {
          await this.storeJWT(res);
        })
      );
  }
}
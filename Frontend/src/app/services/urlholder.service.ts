// Authors: Timothy Carta and Victoria Gorski

import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class URLHolderService {
  URL = 'https://quinnipiac-advising-assistant.herokuapp.com';
  HEADERS = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
    'Access-Control-Allow-Headers':
      'Content-Type, Authorization, X-Requested-With',
  });

  constructor() {}
}
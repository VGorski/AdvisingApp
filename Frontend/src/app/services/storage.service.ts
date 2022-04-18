// Authors: Timothy Carta and Victoria Gorski

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  // Get the advisee that has been selected to plan the schedule for
  getSelectedAdvisee() {
    return Number.parseInt(localStorage.getItem('selected_advisee') || '-1');
  }

  // Set the advisee that has been selected to plan the schedule for
  setSelectedAdvisee(advisee_id: number) {
    localStorage.setItem('selected_advisee', advisee_id.toString());
  }
}

import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css'],
})
export class AdminViewComponent implements OnInit {
  admin_id = 4; //This will change if Professor Kiassat is no longer admin
  firstName = '';
  lastName = '';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getAdvisorName(this.admin_id).subscribe((name) => {
      this.firstName = name.firstName;
      this.lastName = name.lastName;
    });
  }
}

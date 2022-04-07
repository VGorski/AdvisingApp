import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-advisee-view',
  templateUrl: './advisee-view.component.html',
  styleUrls: ['./advisee-view.component.css']
})
export class AdviseeViewComponent implements OnInit {

  advisee_id = -1; //TODO make this dependent upon who logged in

  advisee = {
    "firstName": "",
    "lastName": ""
  }

  constructor(private dataService: DataService, private logoutRouter: Router) { }

  ngOnInit(): void {
   
    this.getAdviseeId().then(() => {
      this.dataService.getAdviseeName(this.advisee_id).subscribe((advisee) => {
      this.advisee = advisee;
    })
    })

  
    
  }

  async getAdviseeId() {
    this.advisee_id = await Number.parseInt(localStorage.getItem('advisee_id') || "-1");
  }

  logout() {
    console.log("Logging out");
    localStorage.removeItem('token');
    localStorage.removeItem('advisee_id');
    localStorage.removeItem('role');
    this.logoutRouter.navigate(['/']);
  }

}


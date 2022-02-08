import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-advisee-view',
  templateUrl: './advisee-view.component.html',
  styleUrls: ['./advisee-view.component.css']
})
export class AdviseeViewComponent implements OnInit {

  advisee_id = 4 //TODO make this dependent upon who logged in

  advisee = {
    "firstName": "",
    "lastName": ""
  }

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getAdviseeName(this.advisee_id).subscribe((advisee) => {
      this.advisee = advisee;
    })
  }

}

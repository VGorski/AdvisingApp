import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-advisor-view',
  templateUrl: './advisor-view.component.html',
  styleUrls: ['./advisor-view.component.css']
})
export class AdvisorViewComponent implements OnInit {
  advisor_id = 3
  constructor() { }

  ngOnInit(): void {
  }

}

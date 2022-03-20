import { Component, Input, OnInit } from '@angular/core';
import { DataService} from '../data.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent implements OnInit {
  @Input() advisor_id: number = -1;
  @Input() advisingPeriodInProgress: boolean = false;

  advisees = [
    {
      advisee_id: -1,
      firstName: '',
      lastName: '',
      flagged: false,
    },
  ];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getAdvisees(this.advisor_id).subscribe((response) => {
      this.advisees = response;
    });
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent implements OnInit {
  @Input() advisor_id: number = -1;
  @Input() advisingPeriodInProgress: boolean = false;
  @Output() flagAdvisor = new EventEmitter<boolean>();

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

  flagAdvisee(advisee: any) {
    advisee.flagged = true;
    this.flagAdvisor.emit();
  }

  setGlobalAdvisee(advisee_id: number) {
    this.dataService.setSelectedAdvisee(advisee_id);
  }
}

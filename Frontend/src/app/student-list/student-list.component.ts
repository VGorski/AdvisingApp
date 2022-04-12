import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GetDataService } from '../services/get-data.service';
import { StorageService } from '../services/storage.service';

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

  constructor(
    private getDataService: GetDataService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.getDataService.getAdvisees(this.advisor_id).subscribe((response) => {
      this.advisees = response;
    });
  }

  flagAdvisee(advisee: any) {
    advisee.flagged = true;
    this.flagAdvisor.emit();
  }

  setGlobalAdvisee(advisee_id: number) {
    this.storageService.setSelectedAdvisee(advisee_id);
  }
}

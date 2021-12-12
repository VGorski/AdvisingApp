import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { DataService } from '../data.service';


@Component({
  selector: 'app-schedule-build',
  templateUrl: './schedule-build.component.html',
  styleUrls: ['./schedule-build.component.css']
})
export class ScheduleBuildComponent implements OnInit {

  filter = ""
  disciplines = [{
    "discipline": ""
  }]

  available = [{
    "course_id": -1,
    "name": "",
    "discipline": ""
  }];

  chosen = [{
    "course_id": -1,
    "name": "",
    "discipline": ""
  }];
  
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.available.pop()
    this.chosen.pop()

    this.dataService.getAvailableCourses(this.filter).subscribe((courses) => {
      this.available = courses
    })

    this.dataService.getDisciplines().subscribe((disciplines) => {
      this.disciplines = disciplines
    })
  }

  getFilteredCourses() {
    this.dataService.getAvailableCourses(this.filter).subscribe((courses) => {
      this.available = courses
    })
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}

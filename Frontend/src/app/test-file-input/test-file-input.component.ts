import { Component, OnInit } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { DataService } from '../data.service';

@Component({
  selector: 'app-test-file-input',
  templateUrl: './test-file-input.component.html',
  styleUrls: ['./test-file-input.component.css'],
})
export class TestFileInputComponent implements OnInit {
  constructor(private papa: Papa, private dataService: DataService) {}

  ngOnInit(): void {}

  // Whenever a new file is selected to upload
  // Just for testing - this will be changed to be upon form submit
  fileChange(event: any) {
    // Get any files from the file input
    let files: FileList = event.target.files;

    // If a file has actually been uploaded
    if (files.length > 0) {
      let file: File = files[0];
      let extension = file.name.split('.').pop(); //Get the file extension

      if (extension == 'csv') {
        file.text().then((text) => {
          if (text.includes("I-Course?")) {
            this.processCoursesCSV(file)
          } else {
            this.processUsersCoursesCSV(file)
          }
        });
      } else if (extension == 'xlsx') {
      }
    }
  }

  processCoursesCSV(file: File) {
    console.log("Processing Courses CSV...");
    this.papa.parse(file, {
      complete: (result) => {
        result.data.forEach((element: any) => {
          delete element['Title'];
        })
        this.dataService.postCourses(result.data)
      },
      header: true
    })
  }

  processUsersCoursesCSV(file: File) {
    console.log("Processing Users and Courses CSV...");
    this.papa.parse(file, {
      complete: (result) => {
        // Remove data that doesn't need to be sent to the backend
        result.data.forEach((element: any) => {
          delete element['Sec Short Title'];
          delete element['Current Status'];
          delete element['Verified Grade '];
          delete element['Term'];
          delete element['Class'];
          delete element['Program 2'];

          // Change the code into a discipline format
          // Add the discipline attribute
          element['discipline'] = this.getDisciplineFromCode(
            element['Program 1']
          );

          delete element['Program 1'];
        });

        //Format of Data
        /*
        Adv First Name: ""
        Adv Last Name: ""
        Advisor Email: ""
        Course: ""
        Qu Email: ""
        Student First Name: ""
        Student Last Name: ""
        discipline: ""
        */

        this.dataService.postBatchUserInfo(result.data);
      },
      header: true,
    });
  }

  getDisciplineFromCode(code: string): string {
    let newCode: string = '';
    switch (code) {
      case 'ECIVI.BS':
        newCode = 'CER';
        break;
      case 'EINDU.BS':
        newCode = 'IER';
        break;
      case 'EMECH.BS':
        newCode = 'MER';
        break;
      case 'ECSCI.BS':
        newCode = 'CSC';
        break;
      case 'ECOMP.BA':
        newCode = '???';
        break;
      case 'ESOFT.SER':
        newCode = 'CER';
        break;
    }
    return newCode;
  }
}

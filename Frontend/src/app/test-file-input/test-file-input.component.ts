import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { PostDataService } from '../services/post-data.service';

@Component({
  selector: 'app-test-file-input',
  templateUrl: './test-file-input.component.html',
  styleUrls: ['./test-file-input.component.css'],
})
export class TestFileInputComponent implements OnInit {
  constructor(private papa: Papa, private postDataService: PostDataService) {}

  @Output() updateCheckboxes = new EventEmitter<string>();
  @Output() successfulUpload = new EventEmitter<string>();
  doingWork = false;

  ngOnInit(): void {}

  // Whenever a new file is selected to upload
  // Just for testing - this will be changed to be upon form submit

  fileChange(event: any) {
    this.doingWork = true;
    // Get any files from the file input
    let files: FileList = event.target.files;

    // If a file has actually been uploaded
    if (files.length > 0) {
      let file: File = files[0];
      let extension = file.name.split('.').pop(); // Get the file extension

      if (extension == 'csv') {
        file
          .text()
          .then(async (text) => {
            if (text.includes('I-Course?')) {
              await this.processUCCourses(file);
            } else if (text.includes('Sec Short Title')) {
              await this.processUsersCourses(file);
            } else if (text.includes('Sec Name')) {
              await this.processMathCourses(file);
            } else if (text.includes('Crs Name')) {
              // This will process both engineering and all course upload
              await this.processEngineeringAllCourses(file);
            } else if (text.includes('ID')) {
              await this.processRegisteredCourses(file);
            } else {
              // TODO: Throw an error and display that to the user
              console.log('File uploaded was not of the correct format...');
            }
          })
          .then(() => {
            this.doingWork = false;
            this.updateCheckboxes.emit();
          });
      } else if (extension == 'xlsx') {
      }
    }
  }

  processUCCourses(file: File) {
    console.log('Processing Courses CSV...');
    this.papa.parse(file, {
      complete: (result) => {
        result.data.forEach((element: any) => {
          // Remove data that does not need to be sent
          delete element['Title'];
        });

        //Format of Data
        /*
        Number: "",
        I-Course?: "",
        UC Area: ""
        */

        this.postDataService.postUCCourses(result.data).then(() => {
          this.postDataService.markFileAsUploaded('ucCourses').subscribe(() => {
            this.successfulUpload.emit();
          });
        });
      },
      header: true,
    });
  }

  processUsersCourses(file: File) {
    console.log('Processing Users and Courses CSV...');
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

        this.postDataService.postBatchUserInfo(result.data).then(() => {
          this.postDataService
            .markFileAsUploaded('studentsFaculty')
            .subscribe(() => {
              this.successfulUpload.emit();
            });
        });
      },
      header: true,
    });
  }

  processMathCourses(file: File) {
    console.log('Processing Specialized Courses CSV...');
    this.papa.parse(file, {
      complete: (result) => {
        // Remove empty names
        result.data = result.data.filter((element: any) => {
          return element['Sec Name'] != '';
        });

        // Remove * and section number
        result.data.map((element: any) => {
          let nameArray = element['Sec Name'].split('*');
          element['Sec Name'] = nameArray[0] + ' ' + nameArray[1];
        });

        // Remove data that does not need to exist
        result.data.forEach((element: any) => {
          delete element['Long Title'];
          delete element['Short Title'];
          delete element['Term'];
          delete element['Start Date'];
          delete element['End Date'];
          delete element[' Start Time'];
          delete element['End Time'];
          delete element['Days'];
          delete element['Fac L Name'];
          delete element['Fac F Name'];
          delete element['Loc'];
          delete element['Bldg'];
          delete element['Room'];
          delete element['Status'];
          delete element['Avail Status'];
          delete element['Rm Cap'];
          delete element['Sec Cap'];
          delete element['Stu Count'];
          delete element['Avail'];
          delete element['Xlists Capacity'];
          delete element['Cap/Size'];
          delete element['Instr Methods'];
          delete element['Modality '];
          delete element['Classification '];
          delete element['Attribute '];
          delete element['Min Cred'];
        });

        this.postDataService.postMathCourses(result.data).then(() => {
          this.postDataService
            .markFileAsUploaded('mathCourses')
            .subscribe(() => {
              this.successfulUpload.emit();
            });
        });
      },
      header: true,
    });
  }

  processEngineeringAllCourses(file: File) {
    this.papa.parse(file, {
      complete: (result) => {
        // Remove empty names
        result.data = result.data.filter((element: any) => {
          return element['Crs Name'] != '';
        });

        // Remove *
        result.data.map((element: any) => {
          let nameArray = element['Crs Name'].split('*');
          element['Crs Name'] = nameArray[0] + ' ' + nameArray[1];
        });

        // Remove data that does not need to exist
        result.data.forEach((element: any) => {
          delete element['Sec No'];
          delete element['Long Title'];
          delete element['Term'];
          delete element['Sec Start Date'];
          delete element['Sec End Date'];
          delete element[' Start Time'];
          delete element['End Time'];
          delete element['Days'];
          delete element['Instr Methods'];
          delete element['Fac First Name'];
          delete element['Fac Last Name'];
          delete element['Location'];
          delete element['Bldg'];
          delete element['Room'];
          delete element['Status'];
          delete element['Avail Status'];
          delete element['Room Cap'];
          delete element['Sec Cap'];
          delete element['Stu Count'];
          delete element['Available'];
          delete element['Xlists Capacity'];
          delete element['Cap/Size'];
          delete element['Classification '];
          delete element['Modality '];
          delete element['Sec Max Cred'];
          delete element['Attribute '];
          delete element['Sec Min Cred'];
        });

        let length = result.data.filter((element: any) => {
          return element;
        }).length;
        console.log(length);

        this.postDataService.postEngineeringAllCourses(result.data).then(() => {
          if (length > 1500) {
            this.postDataService
              .markFileAsUploaded('allCourses')
              .subscribe(() => {
                this.successfulUpload.emit();
              });
          } else {
            this.postDataService
              .markFileAsUploaded('engineeringCourses')
              .subscribe(() => {
                this.successfulUpload.emit();
              });
          }
        });
      },
      header: true,
    });
  }

  processRegisteredCourses(file: File) {
    this.papa.parse(file, {
      complete: (result) => {
        // Remove empty names
        result.data = result.data.filter((element: any) => {
          return element['Course Name'];
        });

        // Remove data that does not need to exist
        result.data.forEach((element: any) => {
          delete element['ID'];
          delete element['Class'];
          delete element['Program 1'];
          delete element['Program 2'];
          delete element['Term'];
          delete element['Status'];
          delete element['Stc Title'];
          delete element['Start Time'];
          delete element['End Time'];
          delete element['Days '];
          delete element['Instr Method'];
          delete element['Location'];
          delete element['Bldg'];
          delete element['Room'];
          delete element['Room Cap'];
          delete element['Sec Cap'];
          delete element['Advisor 1 First Name'];
          delete element['Advisor 1 Last Name'];
          delete element['Advisor 2 First Name'];
          delete element['Advisor 2 Last Name'];
          delete element['Section'];
        });

        // Format of Data
        /*
          Course Name: "FLW 130"
          First Name: "First"
          Last Name: "Last"
        */

        // Remove * and section number
        result.data.map((element: any) => {
          let nameArray = element['Course Name'].split('*');
          element['Course Name'] = nameArray[0] + ' ' + nameArray[1];
        });

        this.postDataService
          .postRegisteredCourses(result.data)
          .then(() => {
            this.postDataService
              .markFileAsUploaded('registeredCourses')
              .subscribe(() => {
                this.successfulUpload.emit();
              });
          })
          .catch(() => {
            this.updateCheckboxes.emit();
          });
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
        newCode = 'SER';
        break;
    }
    return newCode;
  }
}

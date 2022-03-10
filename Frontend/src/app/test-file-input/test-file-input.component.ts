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
      let extension = file.name.split('.').pop(); // Get the file extension

      if (extension == 'csv') {
        file.text().then((text) => {
          if (text.includes('I-Course?')) {
            this.processCourses(file);
          } else if (text.includes('Sec Short Title')) {
            this.processUsersCourses(file);
          } else if (text.includes('Sec Name')) {
            this.processMathCourses(file);
          } else if (text.includes('Crs Name')) {
            this.processEngineeringCourses(file);
          } else {
            // TODO: Throw an error and display that to the user
            console.log("File uploaded was not of the correct format...");
          }
        });
      } else if (extension == 'xlsx') {
      }
    }
  }

  processCourses(file: File) {
    console.log("Processing Courses CSV...");
    this.papa.parse(file, {
      complete: (result) => {
        result.data.forEach((element: any) => {
          // Remove data that does not need to be sent
          delete element['Title'];
        })

        //Format of Data
        /*
        Number: "",
        I-Course?: "",
        UC Area: ""
        */

        console.log(result.data);
        this.dataService.postGeneralCourses(result.data)
      },
      header: true
    })
  }

  processUsersCourses(file: File) {
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

        console.log(result.data);

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

  processMathCourses(file: File) {
    console.log("Processing Specialized Courses CSV...");
    this.papa.parse(file, {
      complete: (result) => {

        // Remove empty names
        result.data = result.data.filter((element: any) => {
          return element["Sec Name"] != ''
        })

        // Remove * and section number
        result.data.map((element: any) => {
          let nameArray = element["Sec Name"].split('*');
          element["Sec Name"] = nameArray[0] + " " + nameArray[1]
        })

        // Remove data that does not need to exist
        result.data.forEach((element:any) => { 
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
        })

        this.dataService.postMathCourses(result.data)
      },
      header: true,
    })
  }

  processEngineeringCourses(file: File) {
    this.papa.parse(file, {
      complete: (result) => {
        // Remove empty names
        result.data = result.data.filter((element: any) => {
          return element["Crs Name"] != ''
        })

        // Remove *
        result.data.map((element: any) => {
          let nameArray = element["Crs Name"].split('*');
          element["Crs Name"] = nameArray[0] + " " + nameArray[1]
        })

        // Remove data that does not need to exist
        result.data.forEach((element:any) => { 
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
          delete element['Location']
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
      })
        
        this.dataService.postEngineeringCourses(result.data)
      },
      header: true,
    })
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

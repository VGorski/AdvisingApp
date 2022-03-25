import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-admin-file-upload',
  templateUrl: './admin-file-upload.component.html',
  styleUrls: ['./admin-file-upload.component.css'],
})
export class AdminFileUploadComponent implements OnInit {
  fileName = '';

  files = {
    math: '',
    engineering: '',
    uc: '',
    all: '',
    studentFaculty: '',
    registered: '',
  };

  showSuccessfulUpload = false;

  constructor(private http: HttpClient, private dataservice: DataService) {}

  selectFile(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      const dataForm = new FormData();
      dataForm.append('file', file);
      //const upload$ = this.http.post("/")
      //upload$.subscribe;
    }
  }

  ngOnInit(): void {
    this.getUploadedFiles();
  }

  getUploadedFiles() {
    this.dataservice.getUploadedFiles().then((files) => {
      this.files = files;
    });
  }

  successfulUpload() {
    this.showSuccessfulUpload = true;
    setTimeout(() => {
      this.showSuccessfulUpload = false;
    }, 5000);
  }
}

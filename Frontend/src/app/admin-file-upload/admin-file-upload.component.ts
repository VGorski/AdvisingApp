// Authors: Timothy Carta and Victoria Gorski

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetDataService } from '../services/get-data.service';

@Component({
  selector: 'app-admin-file-upload',
  templateUrl: './admin-file-upload.component.html',
  styleUrls: ['./admin-file-upload.component.css'],
})
export class AdminFileUploadComponent implements OnInit {
  // Start off as no files have been uploaded yet
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

  constructor(
    private getDataService: GetDataService,
    private logoutRouter: Router
  ) {}

  // Read in what file is getting uploaded
  selectFile(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      const dataForm = new FormData();
      dataForm.append('file', file);
    }
  }

  ngOnInit(): void {
    this.getUploadedFiles();
  }

  // Get information from uploaded file(s)
  getUploadedFiles() {
    this.getDataService.getUploadedFiles().then((files) => {
      this.files = files;
    });
  }

  // Log the user out
  logout() {
    console.log('Logging out');
    localStorage.removeItem('token');
    localStorage.removeItem('advisee_id');
    localStorage.removeItem('role');
    this.logoutRouter.navigate(['/']);
  }

  // Show that a file has been successfully uploaded
  successfulUpload() {
    this.showSuccessfulUpload = true;
    setTimeout(() => {
      this.showSuccessfulUpload = false;
    }, 5000);
  }
}

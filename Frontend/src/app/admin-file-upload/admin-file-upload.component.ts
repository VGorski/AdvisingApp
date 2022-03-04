import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-file-upload',
  templateUrl: './admin-file-upload.component.html',
  styleUrls: ['./admin-file-upload.component.css']
})
export class AdminFileUploadComponent implements OnInit {

  fileName = '';

  constructor(private http: HttpClient) { }

  selectFile(event:any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      const dataForm = new FormData();
      dataForm.append("file", file);
      //const upload$ = this.http.post("/")
      //upload$.subscribe;
    }
  }

  ngOnInit(): void {
  }

}

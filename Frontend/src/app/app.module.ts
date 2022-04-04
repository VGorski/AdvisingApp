import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdvisorViewComponent } from './advisor-view/advisor-view.component';
import { StudentListComponent } from './student-list/student-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { AdvisorReportComponent } from './advisor-report/advisor-report.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ScheduleBuildComponent } from './schedule-build/schedule-build.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop'
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AdvisorViewAdviseesComponent } from './advisor-view-advisees/advisor-view-advisees.component';
import { AdviseeScheduleComponent } from './advisee-schedule/advisee-schedule.component';
import { AdviseeViewComponent } from './advisee-view/advisee-view.component';
import { TestFileInputComponent } from './test-file-input/test-file-input.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { AdminFileUploadComponent } from './admin-file-upload/admin-file-upload.component';
import { FileUploadListComponent } from './file-upload-list/file-upload-list.component';
import { HeaderComponent } from './header/header.component';
import { ReadInputComponent } from './read-input/read-input.component';
import { GenericLayoutComponent } from './generic-layout/generic-layout.component';


@NgModule({
  declarations: [
    AppComponent,
    AdvisorViewComponent,
    StudentListComponent,
    AdvisorReportComponent,
    ScheduleComponent,
    ScheduleBuildComponent,
    LoginComponent,
    AdvisorViewAdviseesComponent,
    AdviseeScheduleComponent,
    AdviseeViewComponent,
    TestFileInputComponent,
    AdminViewComponent,
    AdminFileUploadComponent,
    FileUploadListComponent,
    HeaderComponent,
    ReadInputComponent,
    GenericLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    DragDropModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

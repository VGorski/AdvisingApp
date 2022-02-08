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
import { LoginComponent } from './login/login.component';
import { AdvisorViewAdviseesComponent } from './advisor-view-advisees/advisor-view-advisees.component';
import { AdviseeScheduleComponent } from './advisee-schedule/advisee-schedule.component';
import { AdviseeViewComponent } from './advisee-view/advisee-view.component';


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
    AdviseeViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    DragDropModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

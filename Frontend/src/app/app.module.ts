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


@NgModule({
  declarations: [
    AppComponent,
    AdvisorViewComponent,
    StudentListComponent,
    AdvisorReportComponent,
    ScheduleComponent,
    ScheduleBuildComponent
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

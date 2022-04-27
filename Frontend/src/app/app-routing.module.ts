// Authors: Timothy Carta and Victoria Gorski

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdviseeScheduleComponent } from './advisee-schedule/advisee-schedule.component';
import { AdviseeViewComponent } from './advisee-view/advisee-view.component';
import { AdvisorReportComponent } from './advisor-report/advisor-report.component';
import { AdvisorViewAdviseesComponent } from './advisor-view-advisees/advisor-view-advisees.component';
import { AdvisorViewComponent } from './advisor-view/advisor-view.component';
import { LoginComponent } from './login/login.component';
import { ScheduleBuildComponent } from './schedule-build/schedule-build.component';
import { TestFileInputComponent } from './test-file-input/test-file-input.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { AdminFileUploadComponent } from './admin-file-upload/admin-file-upload.component';
import { AdminReportComponent } from './admin-report/admin-report.component';
import { AdminViewAdviseesComponent } from './admin-view-advisees/admin-view-advisees.component';
import { AdminReportAdviseesComponent } from './admin-report-advisees/admin-report-advisees.component';
import { BuildScheduleAdminComponent } from './build-schedule-admin/build-schedule-admin.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'advisor-view', component: AdvisorViewComponent },
  { path: 'advisor-view-advisees', component: AdvisorViewAdviseesComponent },
  { path: 'advisor-report', component: AdvisorReportComponent },
  { path: 'build-schedule', component: ScheduleBuildComponent },
  { path: 'advisee-view', component: AdviseeViewComponent },
  { path: 'advisee-schedule', component: AdviseeScheduleComponent },
  { path: 'fileTest', component: TestFileInputComponent },
  { path: 'admin-view', component: AdminViewComponent },
  { path: 'admin-file-upload', component: AdminFileUploadComponent },
  { path: 'admin-report', component: AdminReportComponent },
  { path: 'admin-view-advisees', component: AdminViewAdviseesComponent },
  { path: 'admin-report-advisees', component: AdminReportAdviseesComponent },
  { path: 'build-schedule-admin', component: BuildScheduleAdminComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
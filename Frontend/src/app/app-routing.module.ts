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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

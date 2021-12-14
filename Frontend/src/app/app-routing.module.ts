import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvisorReportComponent } from './advisor-report/advisor-report.component';
import { AdvisorViewComponent } from './advisor-view/advisor-view.component';
import { LoginComponent } from './login/login.component';
import { ScheduleBuildComponent } from './schedule-build/schedule-build.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'advisor-view', component: AdvisorViewComponent },
  { path: 'advisor-report', component: AdvisorReportComponent },
  { path: 'build-schedule', component: ScheduleBuildComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

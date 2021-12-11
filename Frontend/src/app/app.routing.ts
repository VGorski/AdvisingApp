import { ModuleWithProviders } from '@angular/compiler/src/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdviseeDashboardComponent } from './advisee-dashboard/advisee-dashboard.component';
import { AdviseeScheduleComponent } from './advisee-schedule/advisee-schedule.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'adviseeDashboard', component: AdviseeDashboardComponent },
    { path: 'adviseeSchedule', component: AdviseeScheduleComponent}
];
  
export const appRouting: ModuleWithProviders = RouterModule.forRoot(routes);
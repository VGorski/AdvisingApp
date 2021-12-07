import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule, RouterOutlet, Routes } from '@angular/router';
//import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdviseeDashboardComponent } from './advisee-dashboard/advisee-dashboard.component';
import { AdviseeScheduleComponent } from './advisee-schedule/advisee-schedule.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'adviseeDashboard', component: AdviseeDashboardComponent },
  { path: 'adviseeSchedule', component: AdviseeScheduleComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdviseeDashboardComponent,
    AdviseeScheduleComponent
  ],
  imports: [
    BrowserModule,
    //AppRoutingModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
  

export class AppModule { }

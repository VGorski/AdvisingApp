import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule, RouterOutlet, Routes } from '@angular/router';
//import { AppRoutingModule } from './app-routing.module';
import { appRouting } from './app.routing';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdviseeDashboardComponent } from './advisee-dashboard/advisee-dashboard.component';
import { AdviseeScheduleComponent } from './advisee-schedule/advisee-schedule.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdviseeDashboardComponent,
    AdviseeScheduleComponent
  ],
  imports: [
    BrowserModule,
    appRouting,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
  

export class AppModule { }

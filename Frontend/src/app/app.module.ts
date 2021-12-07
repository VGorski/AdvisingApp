import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
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
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

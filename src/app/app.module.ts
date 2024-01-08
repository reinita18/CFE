import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ReportListComponent } from './components/report-list/report-list.component';
import { NavigationComponent } from './components/navigation/navigation.component';

import {ReportsService} from "./services/reports.service";
import { ReportComponent } from './components/report/report.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ReportListComponent,
    NavigationComponent,
    ReportComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    ReportsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

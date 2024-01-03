import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {ReportListComponent} from "./components/report-list/report-list.component";
import {LoginComponent} from "./components/login/login.component";
import {ReportComponent} from "./components/report/report.component";

const routes: Routes = [
  {
    path: '', 
  component: LoginComponent
  },
  {
    path:"reports",
    component: ReportListComponent
  },
  {
    path:"report",
    component: ReportListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

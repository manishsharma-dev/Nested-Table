import { LayoutComponent } from './layout/layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'Dashboard' },
      {path:"Dashboard", loadChildren : ()=> import("./dashboard/dashboard.module").then(dashboard => dashboard.DashboardModule)},
      {path:"Timesheet/:UserId/:SignInDate",loadChildren:()=>import("./timesheet/timesheet.module").then(timesheet=>timesheet.TimesheetModule)}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }

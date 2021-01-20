import { AlertModule } from '../../Resources/alert/alert.module';
import { DataTableComponent } from './data-table/data-table.component';
import { MaterialModule } from './../../Resources/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { AlertComponent } from '../../Resources/alert/alert.component'; 
import {MAT_SNACK_BAR_DATA} from '@angular/material';
import { ReporteeTableComponent } from './reportee-table/reportee-table.component';
import { DepartmentTableComponent } from './department-table/department-table.component';
@NgModule({
  declarations: [DashboardComponent,
  DataTableComponent,
  ReporteeTableComponent,
  DepartmentTableComponent  
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    NgxSpinnerModule,
    AlertModule
  ],
  entryComponents:[AlertComponent],
  providers: [ { provide: MAT_SNACK_BAR_DATA, useValue: {} }],
})
export class DashboardModule { }

import { MaterialModule } from './../../Resources/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmindashboardRoutingModule } from './admindashboard-routing.module';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { AdminDataTableComponent } from './admin-data-table/admin-data-table.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [AdmindashboardComponent, AdminDataTableComponent],
  imports: [
    CommonModule,
    AdmindashboardRoutingModule,
    MaterialModule,
    NgxSpinnerModule
  ]
})
export class AdmindashboardModule { }

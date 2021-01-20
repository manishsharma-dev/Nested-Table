import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimesheetRoutingModule } from './timesheet-routing.module';
import { TimesheetTableComponent } from './timesheet-table/timesheet-table.component';
import { MaterialModule } from '../../Resources/material';
import { TimesheetComponent } from './timesheet/timesheet.component'

@NgModule({
  declarations: [TimesheetTableComponent, TimesheetComponent],
  imports: [
    CommonModule,
    TimesheetRoutingModule,
    MaterialModule
  ]
})
export class TimesheetModule { }

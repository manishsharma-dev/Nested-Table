import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModule } from '../../Resources/alert/alert.module';
import { AlertComponent } from '../../Resources/alert/alert.component';
import { SettingRoutingModule } from './setting-routing.module';
import { SettingComponent } from './setting/setting.component';
import { ShiftTableComponent } from './shift-table/shift-table.component';
import { MaterialModule } from 'src/app/Resources/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [SettingComponent, ShiftTableComponent],
  imports: [
    CommonModule,
    SettingRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    AlertModule,
    NgbModule
  ],
  entryComponents:[AlertComponent]
})
export class SettingModule { }

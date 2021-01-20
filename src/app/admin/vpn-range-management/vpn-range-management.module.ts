import { MaterialModule } from './../../Resources/material';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { VpnRangeManagementRoutingModule } from './vpn-range-management-routing.module';
import { VpnRangeComponent } from './vpn-range/vpn-range.component';
import { VpnRangeTableComponent } from './vpn-range-table/vpn-range-table.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertModule } from '../../Resources/alert/alert.module';
import { AlertComponent } from '../../Resources/alert/alert.component';

@NgModule({
  declarations: [VpnRangeComponent, VpnRangeTableComponent],
  imports: [
    CommonModule,
    VpnRangeManagementRoutingModule,
    MaterialModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    AlertModule
  ],
  entryComponents:[AlertComponent]
})
export class VpnRangeManagementModule { }

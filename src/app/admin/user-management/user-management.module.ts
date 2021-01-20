import { AlertModule } from '../../Resources/alert/alert.module';
import { AlertComponent } from '../../Resources/alert/alert.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MaterialModule } from './../../Resources/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserManagementComponent } from './user-management/user-management.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserManagementTableComponent } from './user-management-table/user-management-table.component';
import { NgSelectModule } from '@ng-select/ng-select';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AssignEmailComponent } from './assign-email/assign-email.component';

@NgModule({
  declarations: [UserManagementComponent, UserManagementTableComponent, AssignEmailComponent],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgxSpinnerModule,
    AlertModule,
    NgbModule
  ],
  entryComponents:[AlertComponent,AssignEmailComponent]
})

export class UserManagementModule { }
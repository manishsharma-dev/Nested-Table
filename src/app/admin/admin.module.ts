import { NgxSpinnerModule } from 'ngx-spinner';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminFooterComponent } from './admin-footer/admin-footer.component';
import { AdminService } from './admin.service';
@NgModule({
  declarations: [AdminComponent, AdminHeaderComponent, AdminFooterComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgxSpinnerModule    
  ],
  providers:[AdminService
  ]
})
export class AdminModule { }

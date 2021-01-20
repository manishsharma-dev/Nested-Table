import { VpnRangeComponent } from './vpn-range/vpn-range.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path:"", component:VpnRangeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VpnRangeManagementRoutingModule { }

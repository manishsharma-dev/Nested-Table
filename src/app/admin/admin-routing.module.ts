import { SuperAdminGuard } from './../Resources/SuperAdmin.guard';
import { AdminComponent } from './admin/admin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path:"",
    component:AdminComponent,
    children:[
      {
        path:"", redirectTo:"dashboard",pathMatch:"full"
      },
      {
        path:"dashboard"
        , loadChildren : () => import("./admindashboard/admindashboard.module")
                               .then(dashboard => dashboard.AdmindashboardModule)
      },
      {
        path:"user-management"
        , loadChildren : () => import("./user-management/user-management.module")
                               .then(userMangament => userMangament.UserManagementModule)
      },
      {
        path:"vpn-management"
        , loadChildren : () => import("./vpn-range-management/vpn-range-management.module")
                               .then(vpn => vpn.VpnRangeManagementModule)
      },
      {
        path:"setting"
        , loadChildren : () => import("./setting/setting.module")
                               .then(s => s.SettingModule)
        , canActivate :[SuperAdminGuard] 
      },
      {
        path:"unauthorised"
        , loadChildren : () => import("../unauthorised/unauthorised.module")
                               .then(u => u.UnauthorisedModule)
      },
      {
        path:"**"
        , loadChildren : () => import("../not-found/not-found.module")
                                .then(n => n.NotFoundModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

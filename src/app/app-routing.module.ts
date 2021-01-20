import { AuthGuard } from './Resources/auth.guard';
import { AdminGuard } from './Resources/admin.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path:"", loadChildren : ()=> import("./layout/layout.module").then(layout => layout.LayoutModule),canActivate :[AuthGuard]},
  {path:"admin",loadChildren : ()=> import("./admin/admin.module").then(admin=>admin.AdminModule), canActivate :[AdminGuard] },
  {path:"unauthorised",loadChildren : ()=> import("./unauthorised/unauthorised.module").then(un=>un.UnauthorisedModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

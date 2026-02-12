import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { SuppliesComponent } from './common/supplies/supplies.component';
import { redirectGuard } from './guards/redirect.guard';

const routes: Routes = [
  {path:'', canActivate:[redirectGuard], component: LoginComponent, pathMatch:"full"},
  {path:'supplies', component:SuppliesComponent},
  {path:"login", component: LoginComponent},
  // {path:"signup", component: SignupComponent},
  {path:"adminuser", loadChildren: ()=>import("./modules/admin/admin.module").then(e=>e.AdminModule)},
  {path:"suppliesuser",  loadChildren: ()=>import("./modules/suppliesuser/suppliesuser.module").then(e=>e.SuppliesuserModule)},
  {path:"admindivuser", loadChildren: ()=>import("./modules/admindivuser/admindivuser.module").then(e=>e.AdmindivuserModule)},
  {path:"subdivuser", loadChildren: ()=>import("./modules/subdivuser/subdivuser.module").then(e=>e.SubdivuserModule)},
  {path:"**", canActivate: [redirectGuard] ,component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

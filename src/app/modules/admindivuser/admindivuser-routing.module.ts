import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmindivHomeComponent } from './components/admindiv-home/admindiv-home.component';
import { AdmindivDashboardComponent } from './components/admindiv-home/admindiv-dashboard/admindiv-dashboard.component';

const routes: Routes = [
  {path:'', redirectTo:"home", pathMatch: "full"},
  {path:'home', component: AdmindivHomeComponent},
  {path: "dashboard", component: AdmindivDashboardComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmindivuserRoutingModule { }

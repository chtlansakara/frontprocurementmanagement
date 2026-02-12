import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubdivHomeComponent } from './components/subdiv-home/subdiv-home.component';
import { SubdivDashboardComponent } from './components/subdiv-home/subdiv-dashboard/subdiv-dashboard.component';

const routes: Routes = [
  {path:'', redirectTo:"home", pathMatch: "full"},
  {path:'home', component: SubdivHomeComponent},
  {path:'dashboard', component: SubdivDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubdivuserRoutingModule { }

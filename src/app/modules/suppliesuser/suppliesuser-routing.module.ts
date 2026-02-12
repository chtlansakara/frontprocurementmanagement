import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuppliesDashboardComponent } from './components/supplies-home/supplies-dashboard/supplies-dashboard.component';
import { SuppliesHomeComponent } from './components/supplies-home/supplies-home.component';


const routes: Routes = [
  {path:'', redirectTo:"home", pathMatch: "full"},
  {path: "home", component: SuppliesHomeComponent, children:[
    {path:'', redirectTo:'dashboard', pathMatch:"full"},
    {path: "dashboard", component: SuppliesDashboardComponent},
  ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuppliesuserRoutingModule { }

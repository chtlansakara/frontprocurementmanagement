import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmindivHomeComponent } from './components/admindiv-home/admindiv-home.component';
import { AdmindivDashboardComponent } from './components/admindiv-home/admindiv-dashboard/admindiv-dashboard.component';
import { AdmindivRequestsComponent } from './components/admindiv-home/admindiv-requests/admindiv-requests.component';
import { AdmindivProcurementComponent } from './components/admindiv-home/admindiv-procurement/admindiv-procurement.component';
import { AdmindivRequestsListComponent } from './components/admindiv-home/admindiv-requests/admindiv-requests-list/admindiv-requests-list.component';
import { AdmindivRequestsFormComponent } from './components/admindiv-home/admindiv-requests/admindiv-requests-form/admindiv-requests-form.component';
import { AdmindivRequestsViewComponent } from './components/admindiv-home/admindiv-requests/admindiv-requests-view/admindiv-requests-view.component';
import { AdmindivRequestsUpdateComponent } from './components/admindiv-home/admindiv-requests/admindiv-requests-update/admindiv-requests-update.component';
import { AdmindivApproveComponent } from './components/admindiv-home/admindiv-requests/admindiv-approve/admindiv-approve.component';
import { AdmindivRejectComponent } from './components/admindiv-home/admindiv-requests/admindiv-reject/admindiv-reject.component';
import { AdmindivProcurementListComponent } from './components/admindiv-home/admindiv-procurement/admindiv-procurement-list/admindiv-procurement-list.component';
import { AdmindivProcurementViewComponent } from './components/admindiv-home/admindiv-procurement/admindiv-procurement-view/admindiv-procurement-view.component';

const routes: Routes = [
  {path:'', redirectTo:"home", pathMatch: "full"},
  {path:'home', component: AdmindivHomeComponent, children: [
    {path: '', redirectTo: 'requests', pathMatch: 'full'},
    {path: "dashboard", component: AdmindivDashboardComponent},
    {path: "requests", component: AdmindivRequestsComponent, children: [
      {path: '', redirectTo: 'list', pathMatch: 'full'},
      {path: 'list', component: AdmindivRequestsListComponent},
      {path: 'form', component: AdmindivRequestsFormComponent},
      {path: 'view/:id', component: AdmindivRequestsViewComponent, children:[
        {path: 'approve/:id', component: AdmindivApproveComponent},
        {path: 'reject/:id', component: AdmindivRejectComponent}
      ]},
      {path: 'update/:id', component: AdmindivRequestsUpdateComponent}
    ]},
    {path: "procurement", component: AdmindivProcurementComponent, children:[
      {path: '', redirectTo:'list', pathMatch: 'full'},
      {path: 'list', component: AdmindivProcurementListComponent},
      {path: 'view/:id', component: AdmindivProcurementViewComponent}
    ]}
  ]},
  {path: "**", redirectTo:'home/dashboard'}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmindivuserRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubdivHomeComponent } from './components/subdiv-home/subdiv-home.component';
import { SubdivDashboardComponent } from './components/subdiv-home/subdiv-dashboard/subdiv-dashboard.component';
import { SubdivRequestsComponent } from './components/subdiv-home/subdiv-requests/subdiv-requests.component';
import { SubdivRequestsListComponent } from './components/subdiv-home/subdiv-requests/subdiv-requests-list/subdiv-requests-list.component';
import { SubdivRequestsFormComponent } from './components/subdiv-home/subdiv-requests/subdiv-requests-form/subdiv-requests-form.component';
import { SubdivRequestsUpdateComponent } from './components/subdiv-home/subdiv-requests/subdiv-requests-update/subdiv-requests-update.component';
import { SubdivProcurementComponent } from './components/subdiv-home/subdiv-procurement/subdiv-procurement.component';
import { SubdivRequestsViewComponent } from './components/subdiv-home/subdiv-requests/subdiv-requests-view/subdiv-requests-view.component';
import { SubdivProcurementListComponent } from './components/subdiv-home/subdiv-procurement/subdiv-procurement-list/subdiv-procurement-list.component';
import { SubdivProcurementViewComponent } from './components/subdiv-home/subdiv-procurement/subdiv-procurement-view/subdiv-procurement-view.component';
import { SubdivProcurementReportComponent } from './components/subdiv-home/subdiv-procurement/subdiv-procurement-report/subdiv-procurement-report.component';
import { ChangePasswordSubdivComponent } from './components/subdiv-home/change-password-subdiv/change-password-subdiv.component';
import { UserUpdateSubdivComponent } from './components/subdiv-home/user-update-subdiv/user-update-subdiv.component';

const routes: Routes = [
  {path:'', redirectTo:"home", pathMatch: "full"},
  {path:'home', component: SubdivHomeComponent, children: [
    {path: '', redirectTo: 'requests', pathMatch: 'full'},
    {path: 'password', component: ChangePasswordSubdivComponent},
    {path: 'update', component: UserUpdateSubdivComponent},
    {path:'dashboard', component: SubdivDashboardComponent},
    {path:'requests', component: SubdivRequestsComponent, children: [
      {path:'', redirectTo: 'list', pathMatch: 'full'},
      {path:'list', component: SubdivRequestsListComponent},
      {path:'form', component: SubdivRequestsFormComponent},
      {path:'view/:id', component: SubdivRequestsViewComponent},
      {path:'update/:id', component: SubdivRequestsUpdateComponent},
    ]},
    {path:'procurement', component:SubdivProcurementComponent, children: [
      {path:'', redirectTo: 'list', pathMatch: 'full'},
      {path: 'list', component: SubdivProcurementListComponent},
      {path: 'report', component: SubdivProcurementReportComponent},
      {path: 'view/:id', component: SubdivProcurementViewComponent}
    ]}
  ]},
  {path:'**', redirectTo:"home"}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubdivuserRoutingModule { }

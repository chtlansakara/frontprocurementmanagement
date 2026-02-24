import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuppliesDashboardComponent } from './components/supplies-home/supplies-dashboard/supplies-dashboard.component';
import { SuppliesHomeComponent } from './components/supplies-home/supplies-home.component';
import { SuppliesRequestsComponent } from './components/supplies-home/supplies-requests/supplies-requests.component';
import { SuppliesProcurementComponent } from './components/supplies-home/supplies-procurement/supplies-procurement.component';
import { SuppliesLogsComponent } from './components/supplies-home/supplies-logs/supplies-logs.component';
import { SuppliesReportsComponent } from './components/supplies-home/supplies-reports/supplies-reports.component';
import { SuppliesRequestListComponent } from './components/supplies-home/supplies-requests/supplies-request-list/supplies-request-list.component';
import { SuppliesRequestsFormComponent } from './components/supplies-home/supplies-requests/supplies-requests-form/supplies-requests-form.component';
import { SuppliesRequestsViewComponent } from './components/supplies-home/supplies-requests/supplies-requests-view/supplies-requests-view.component';
import { SuppliesRequestsUpdateComponent } from './components/supplies-home/supplies-requests/supplies-requests-update/supplies-requests-update.component';
import { SuppliesApproveComponent } from './components/supplies-home/supplies-requests/supplies-approve/supplies-approve.component';
import { SuppliesRejectComponent } from './components/supplies-home/supplies-requests/supplies-reject/supplies-reject.component';
import { ProcurementListComponent } from './components/supplies-home/supplies-procurement/procurement-list/procurement-list.component';
import { ProcurementFormComponent } from './components/supplies-home/supplies-procurement/procurement-form/procurement-form.component';
import { ProcurementPendingComponent } from './components/supplies-home/supplies-procurement/procurement-pending/procurement-pending.component';
import { ProcurementViewComponent } from './components/supplies-home/supplies-procurement/procurement-view/procurement-view.component';
import { ProcurementUpdateStatusComponent } from './components/supplies-home/supplies-procurement/procurement-view/procurement-update-status/procurement-update-status.component';
import { ProcurementUpdateComponent } from './components/supplies-home/supplies-procurement/procurement-update/procurement-update.component';
import { AuditLogComponent } from './components/supplies-home/supplies-logs/audit-log/audit-log.component';


const routes: Routes = [
  {path:'', redirectTo:"home", pathMatch: "full"},
  {path: "home", component: SuppliesHomeComponent, children:[
    {path:'', redirectTo:'requests', pathMatch:"full"},
    {path: "dashboard", component: SuppliesDashboardComponent},
    {path: 'requests' , component: SuppliesRequestsComponent, children:[
      {path: '', redirectTo: 'list', pathMatch: 'full'},
      {path: 'list', component: SuppliesRequestListComponent},
      {path: 'form' , component: SuppliesRequestsFormComponent},
      {path: 'view/:id' , component: SuppliesRequestsViewComponent, children:[
        {path: 'approve/:id', component: SuppliesApproveComponent},
        {path: 'reject/:id', component: SuppliesRejectComponent}
      ]},
      {path: 'update/:id', component: SuppliesRequestsUpdateComponent}
    ]},
    {path: 'procurement', component: SuppliesProcurementComponent, children:[
      {path: '', redirectTo: 'pending', pathMatch: 'full'},
      {path:'list', component: ProcurementListComponent},
      {path: 'form', component: ProcurementFormComponent},
      {path: 'pending', component: ProcurementPendingComponent},
      {path: 'view/:id', component: ProcurementViewComponent, children:[
        {path:"updateStatus/:id", component: ProcurementUpdateStatusComponent}
      ]},
      {path:'update/:id', component: ProcurementUpdateComponent}
    ]},
    {path: 'reports', component: SuppliesReportsComponent},
    {path: 'logs', component: SuppliesLogsComponent}
  ]},
  {path: "**", redirectTo: 'home/dashboard'}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuppliesuserRoutingModule { }

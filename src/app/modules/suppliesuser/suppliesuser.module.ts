import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuppliesuserRoutingModule } from './suppliesuser-routing.module';
import { SuppliesHomeComponent } from './components/supplies-home/supplies-home.component';
import { SuppliesRequestsComponent } from './components/supplies-home/supplies-requests/supplies-requests.component';
import { SuppliesProcurementComponent } from './components/supplies-home/supplies-procurement/supplies-procurement.component';
import { SuppliesLogsComponent } from './components/supplies-home/supplies-logs/supplies-logs.component';
import { AngularmaterialModule } from '../../angularmaterial/angularmaterial.module';
import { SuppliesDashboardComponent } from './components/supplies-home/supplies-dashboard/supplies-dashboard.component';
import { SuppliesReportsComponent } from './components/supplies-home/supplies-reports/supplies-reports.component';
import { SuppliesRequestListComponent } from './components/supplies-home/supplies-requests/supplies-request-list/supplies-request-list.component';
import { SuppliesRequestsFormComponent } from './components/supplies-home/supplies-requests/supplies-requests-form/supplies-requests-form.component';
import { SuppliesRequestsUpdateComponent } from './components/supplies-home/supplies-requests/supplies-requests-update/supplies-requests-update.component';
import { SuppliesRequestsViewComponent } from './components/supplies-home/supplies-requests/supplies-requests-view/supplies-requests-view.component';
import { SuppliesApproveComponent } from './components/supplies-home/supplies-requests/supplies-approve/supplies-approve.component';
import { SuppliesRejectComponent } from './components/supplies-home/supplies-requests/supplies-reject/supplies-reject.component';
import { SuppliesRequestsListAllComponent } from './components/supplies-home/supplies-requests/supplies-request-list/supplies-requests-list-all/supplies-requests-list-all.component';
import { SuppliesRequestsListPendingComponent } from './components/supplies-home/supplies-requests/supplies-request-list/supplies-requests-list-pending/supplies-requests-list-pending.component';
import { SuppliesRequestsListApprovedComponent } from './components/supplies-home/supplies-requests/supplies-request-list/supplies-requests-list-approved/supplies-requests-list-approved.component';
import { SuppliesRequestsListRejectedComponent } from './components/supplies-home/supplies-requests/supplies-request-list/supplies-requests-list-rejected/supplies-requests-list-rejected.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ProcurementFormComponent } from './components/supplies-home/supplies-procurement/procurement-form/procurement-form.component';
import { ProcurementListComponent } from './components/supplies-home/supplies-procurement/procurement-list/procurement-list.component';
import { ProcurementViewComponent } from './components/supplies-home/supplies-procurement/procurement-view/procurement-view.component';
import { ProcurementPendingComponent } from './components/supplies-home/supplies-procurement/procurement-pending/procurement-pending.component';
import { ProcurementUpdateStatusComponent } from './components/supplies-home/supplies-procurement/procurement-view/procurement-update-status/procurement-update-status.component';
import { ProcurementUpdateComponent } from './components/supplies-home/supplies-procurement/procurement-update/procurement-update.component';
import { AuditLogComponent } from './components/supplies-home/supplies-logs/audit-log/audit-log.component';


@NgModule({
  declarations: [
    SuppliesHomeComponent,
    SuppliesDashboardComponent,
    SuppliesRequestsComponent,
    SuppliesProcurementComponent,
    SuppliesLogsComponent,
    SuppliesReportsComponent,
    SuppliesRequestListComponent,
    SuppliesRequestsFormComponent,
    SuppliesRequestsUpdateComponent,
    SuppliesRequestsViewComponent,
    SuppliesApproveComponent,
    SuppliesRejectComponent,
    SuppliesRequestsListAllComponent,
    SuppliesRequestsListPendingComponent,
    SuppliesRequestsListApprovedComponent,
    SuppliesRequestsListRejectedComponent,
    ProcurementFormComponent,
    ProcurementListComponent,
    ProcurementViewComponent,
    ProcurementPendingComponent,
    ProcurementUpdateStatusComponent,
    ProcurementUpdateComponent,
    AuditLogComponent,
  ],
  imports: [
    CommonModule,
    SuppliesuserRoutingModule,
    AngularmaterialModule,
    FormsModule,
    ReactiveFormsModule
]
})
export class SuppliesuserModule { }

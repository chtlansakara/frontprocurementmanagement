import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularmaterialModule } from '../../angularmaterial/angularmaterial.module';
import { AdmindivuserRoutingModule } from './admindivuser-routing.module';
import { AdmindivHomeComponent } from './components/admindiv-home/admindiv-home.component';
import { AdmindivDashboardComponent } from './components/admindiv-home/admindiv-dashboard/admindiv-dashboard.component';
import { AdmindivRequestsComponent } from './components/admindiv-home/admindiv-requests/admindiv-requests.component';
import { AdmindivProcurementComponent } from './components/admindiv-home/admindiv-procurement/admindiv-procurement.component';
import { AdmindivRequestsListComponent } from './components/admindiv-home/admindiv-requests/admindiv-requests-list/admindiv-requests-list.component';
import { AdmindivRequestsFormComponent } from './components/admindiv-home/admindiv-requests/admindiv-requests-form/admindiv-requests-form.component';
import { AdmindivRequestsViewComponent } from './components/admindiv-home/admindiv-requests/admindiv-requests-view/admindiv-requests-view.component';
import { AdmindivRequestsUpdateComponent } from './components/admindiv-home/admindiv-requests/admindiv-requests-update/admindiv-requests-update.component';
import { AdmindivRequestsPendingComponent } from './components/admindiv-home/admindiv-requests/admindiv-requests-list/admindiv-requests-pending/admindiv-requests-pending.component';
import { AdmindivAllComponent } from './components/admindiv-home/admindiv-requests/admindiv-requests-list/admindiv-all/admindiv-all.component';
import { AdmindivApprovedComponent } from './components/admindiv-home/admindiv-requests/admindiv-requests-list/admindiv-approved/admindiv-approved.component';
import { AdmindivRejectedComponent } from './components/admindiv-home/admindiv-requests/admindiv-requests-list/admindiv-rejected/admindiv-rejected.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdmindivApproveComponent } from './components/admindiv-home/admindiv-requests/admindiv-approve/admindiv-approve.component';
import { AdmindivRejectComponent } from './components/admindiv-home/admindiv-requests/admindiv-reject/admindiv-reject.component';


@NgModule({
  declarations: [
    AdmindivDashboardComponent,
    AdmindivHomeComponent,
    AdmindivRequestsComponent,
    AdmindivProcurementComponent,
    AdmindivRequestsListComponent,
    AdmindivRequestsFormComponent,
    AdmindivRequestsViewComponent,
    AdmindivRequestsUpdateComponent,
    AdmindivRequestsPendingComponent,
    AdmindivAllComponent,
    AdmindivApprovedComponent,
    AdmindivRejectedComponent,
    AdmindivApproveComponent,
    AdmindivRejectComponent
  ],
  imports: [
    CommonModule,
    AdmindivuserRoutingModule,
    AngularmaterialModule,
    FormsModule,
    ReactiveFormsModule
]
})
export class AdmindivuserModule { }

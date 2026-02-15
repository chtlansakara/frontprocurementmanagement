import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularmaterialModule } from '../../angularmaterial/angularmaterial.module';
import { SubdivuserRoutingModule } from './subdivuser-routing.module';
import { SubdivHomeComponent } from './components/subdiv-home/subdiv-home.component';
import { SubdivDashboardComponent } from './components/subdiv-home/subdiv-dashboard/subdiv-dashboard.component';
import { SubdivRequestsComponent } from './components/subdiv-home/subdiv-requests/subdiv-requests.component';
import { SubdivProcurementComponent } from './components/subdiv-home/subdiv-procurement/subdiv-procurement.component';
import { SubdivRequestsListComponent } from './components/subdiv-home/subdiv-requests/subdiv-requests-list/subdiv-requests-list.component';
import { SubdivRequestsFormComponent } from './components/subdiv-home/subdiv-requests/subdiv-requests-form/subdiv-requests-form.component';
import { SubdivRequestsUpdateComponent } from './components/subdiv-home/subdiv-requests/subdiv-requests-update/subdiv-requests-update.component';


@NgModule({
  declarations: [
    SubdivDashboardComponent,
    SubdivHomeComponent,
    SubdivRequestsComponent,
    SubdivProcurementComponent,
    SubdivRequestsListComponent,
    SubdivRequestsFormComponent,
    SubdivRequestsUpdateComponent
  ],
  imports: [
    CommonModule,
    SubdivuserRoutingModule,
    AngularmaterialModule,
  ]
})
export class SubdivuserModule { }

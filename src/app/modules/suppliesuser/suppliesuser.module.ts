import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuppliesuserRoutingModule } from './suppliesuser-routing.module';
import { SuppliesHomeComponent } from './components/supplies-home/supplies-home.component';
import { SuppliesRequestsComponent } from './components/supplies-home/supplies-requests/supplies-requests.component';
import { SuppliesProcurementComponent } from './components/supplies-home/supplies-procurement/supplies-procurement.component';
import { SuppliesLogsComponent } from './components/supplies-home/supplies-logs/supplies-logs.component';
import { AngularmaterialModule } from '../../angularmaterial/angularmaterial.module';
import { SuppliesDashboardComponent } from './components/supplies-home/supplies-dashboard/supplies-dashboard.component';


@NgModule({
  declarations: [
    SuppliesHomeComponent,
    SuppliesDashboardComponent,
    SuppliesRequestsComponent,
    SuppliesProcurementComponent,
    SuppliesLogsComponent,
  ],
  imports: [
    CommonModule,
    SuppliesuserRoutingModule,
    AngularmaterialModule,
  ]
})
export class SuppliesuserModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularmaterialModule } from '../../angularmaterial/angularmaterial.module';
import { SubdivuserRoutingModule } from './subdivuser-routing.module';
import { SubdivHomeComponent } from './components/subdiv-home/subdiv-home.component';
import { SubdivDashboardComponent } from './components/subdiv-home/subdiv-dashboard/subdiv-dashboard.component';


@NgModule({
  declarations: [
    SubdivDashboardComponent,
    SubdivHomeComponent
  ],
  imports: [
    CommonModule,
    SubdivuserRoutingModule,
    AngularmaterialModule,
  ]
})
export class SubdivuserModule { }

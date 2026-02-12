import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularmaterialModule } from '../../angularmaterial/angularmaterial.module';
import { AdmindivuserRoutingModule } from './admindivuser-routing.module';
import { AdmindivHomeComponent } from './components/admindiv-home/admindiv-home.component';
import { AdmindivDashboardComponent } from './components/admindiv-home/admindiv-dashboard/admindiv-dashboard.component';


@NgModule({
  declarations: [
    AdmindivDashboardComponent,
    AdmindivHomeComponent
  ],
  imports: [
    CommonModule,
    AdmindivuserRoutingModule,
    AngularmaterialModule,
  ]
})
export class AdmindivuserModule { }

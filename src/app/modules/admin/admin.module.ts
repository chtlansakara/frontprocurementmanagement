import { AngularmaterialModule } from './../../angularmaterial/angularmaterial.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AdminDashboardComponent } from './components/admin-home/admin-dashboard/admin-dashboard.component';
import { UsersComponent } from './components/admin-home/admin-dashboard/users/users.component';
import { DesignationsComponent } from './components/admin-home/admin-dashboard/designations/designations.component';
import { AdmindivsComponent } from './components/admin-home/admin-dashboard/admindivs/admindivs.component';
import { SubdivsComponent } from './components/admin-home/admin-dashboard/subdivs/subdivs.component';
import { VendorsComponent } from './components/admin-home/admin-dashboard/vendors/vendors.component';
import { UserFormComponent } from './components/admin-home/admin-dashboard/users/user-form/user-form.component';
import { UserListComponent } from './components/admin-home/admin-dashboard/users/user-list/user-list.component';
import { DesignationListComponent } from './components/admin-home/admin-dashboard/designations/designation-list/designation-list.component';
import { DesignationFormComponent } from './components/admin-home/admin-dashboard/designations/designation-form/designation-form.component';
import { SubdivListComponent } from './components/admin-home/admin-dashboard/subdivs/subdiv-list/subdiv-list.component';
import { SubdivFormComponent } from './components/admin-home/admin-dashboard/subdivs/subdiv-form/subdiv-form.component';
import { admindivListComponent } from './components/admin-home/admin-dashboard/admindivs/admindiv-list/admindiv-list.component';
import { AdmindivFormComponent } from './components/admin-home/admin-dashboard/admindivs/admindiv-form/admindiv-form.component';
import { VendorListComponent } from './components/admin-home/admin-dashboard/vendors/vendor-list/vendor-list.component';
import { VendorFormComponent } from './components/admin-home/admin-dashboard/vendors/vendor-form/vendor-form.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DesignationUpdateFormComponent } from './components/admin-home/admin-dashboard/designations/designation-update-form/designation-update-form.component';
import { AdmindivUpdateComponent } from './components/admin-home/admin-dashboard/admindivs/admindiv-update/admindiv-update.component';
import { SubdivUpdateComponent } from './components/admin-home/admin-dashboard/subdivs/subdiv-update/subdiv-update.component';
import { UserUpdateComponent } from './components/admin-home/admin-dashboard/users/user-update/user-update.component';


@NgModule({
  declarations: [

    AdminHomeComponent,
      AdminDashboardComponent,
      UsersComponent,
      DesignationsComponent,
      AdmindivsComponent,
      SubdivsComponent,
      VendorsComponent,
      UserFormComponent,
      UserListComponent,
      DesignationListComponent,
      DesignationFormComponent,
      SubdivListComponent,
      SubdivFormComponent,
      admindivListComponent,
      AdmindivFormComponent,
      VendorListComponent,
      VendorFormComponent,
      DesignationUpdateFormComponent,
      AdmindivUpdateComponent,
      SubdivUpdateComponent,
      UserUpdateComponent,

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AngularmaterialModule,
    FormsModule,
    ReactiveFormsModule
]
})
export class AdminModule { }

import { AngularmaterialModule } from './../../angularmaterial/angularmaterial.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdminRoutingModule } from './admin-routing.module';

import { AdminHomeComponent } from './components/admin-home/admin-home.component';

import { UsersComponent } from './components/admin-home/users/users.component';
import { UserListComponent } from './components/admin-home/users/user-list/user-list.component';
import { UserFormComponent } from './components/admin-home/users/user-form/user-form.component';
import { UserUpdateComponent } from './components/admin-home/users/user-update/user-update.component';

import { DesignationsComponent } from './components/admin-home/designations/designations.component';
import { DesignationListComponent } from './components/admin-home/designations/designation-list/designation-list.component';
import { DesignationFormComponent } from './components/admin-home/designations/designation-form/designation-form.component';
import { DesignationUpdateFormComponent } from './components/admin-home/designations/designation-update-form/designation-update-form.component';

import { AdmindivsComponent } from './components/admin-home/admindivs/admindivs.component';
import { admindivListComponent } from './components/admin-home/admindivs/admindiv-list/admindiv-list.component';
import { AdmindivFormComponent } from './components/admin-home/admindivs/admindiv-form/admindiv-form.component';
import { AdmindivUpdateComponent } from './components/admin-home/admindivs/admindiv-update/admindiv-update.component';

import { SubdivsComponent } from './components/admin-home/subdivs/subdivs.component';
import { SubdivListComponent } from './components/admin-home/subdivs/subdiv-list/subdiv-list.component';
import { SubdivFormComponent } from './components/admin-home/subdivs/subdiv-form/subdiv-form.component';
import { SubdivUpdateComponent } from './components/admin-home/subdivs/subdiv-update/subdiv-update.component';

import { VendorsComponent } from './components/admin-home/vendors/vendors.component';
import { VendorListComponent } from './components/admin-home/vendors/vendor-list/vendor-list.component';
import { VendorFormComponent } from './components/admin-home/vendors/vendor-form/vendor-form.component';
import { AdminDashboardComponent } from './components/admin-home/admin-dashboard/admin-dashboard.component';
import { SourcesComponent } from './components/admin-home/sources/sources.component';
import { SourceFormComponent } from './components/admin-home/sources/source-form/source-form.component';
import { SourceListComponent } from './components/admin-home/sources/source-list/source-list.component';
import { SourceUpdateFormComponent } from './components/admin-home/sources/source-update-form/source-update-form.component';
import { VendorUpdateFromComponent } from './components/admin-home/vendors/vendor-update-from/vendor-update-from.component';
import { StatusComponent } from './components/admin-home/status/status.component';
import { StatusFormComponent } from './components/admin-home/status/status-form/status-form.component';
import { StatusListComponent } from './components/admin-home/status/status-list/status-list.component';
import { StatusUpdateFormComponent } from './components/admin-home/status/status-update-form/status-update-form.component';



@NgModule({
  declarations: [
    AdminHomeComponent,
    DesignationsComponent,
    SubdivsComponent,
    AdmindivsComponent,
    VendorsComponent,
    UsersComponent,
    UserListComponent,
    UserFormComponent,
    UserUpdateComponent,
    DesignationListComponent,
    DesignationFormComponent,
    DesignationUpdateFormComponent,
    admindivListComponent,
    AdmindivFormComponent,
    AdmindivUpdateComponent,
    SubdivListComponent,
    SubdivFormComponent,
    SubdivUpdateComponent,
    VendorListComponent,
    VendorFormComponent,
    AdminDashboardComponent,
    SourcesComponent,
    SourceFormComponent,
    SourceListComponent,
    SourceUpdateFormComponent,
    VendorUpdateFromComponent,
    StatusComponent,
    StatusFormComponent,
    StatusListComponent,
    StatusUpdateFormComponent

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

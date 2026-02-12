import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AdminDashboardComponent } from './components/admin-home/admin-dashboard/admin-dashboard.component';
import { UsersComponent } from './components/admin-home/admin-dashboard/users/users.component';
import { UserFormComponent } from './components/admin-home/admin-dashboard/users/user-form/user-form.component';
import { UserListComponent } from './components/admin-home/admin-dashboard/users/user-list/user-list.component';
import { DesignationsComponent } from './components/admin-home/admin-dashboard/designations/designations.component';
import { SubdivsComponent } from './components/admin-home/admin-dashboard/subdivs/subdivs.component';
import { AdmindivsComponent } from './components/admin-home/admin-dashboard/admindivs/admindivs.component';
import { VendorsComponent } from './components/admin-home/admin-dashboard/vendors/vendors.component';
import { DesignationListComponent } from './components/admin-home/admin-dashboard/designations/designation-list/designation-list.component';
import { DesignationFormComponent } from './components/admin-home/admin-dashboard/designations/designation-form/designation-form.component';
import { admindivListComponent } from './components/admin-home/admin-dashboard/admindivs/admindiv-list/admindiv-list.component';
import { AdmindivFormComponent } from './components/admin-home/admin-dashboard/admindivs/admindiv-form/admindiv-form.component';
import { SubdivListComponent } from './components/admin-home/admin-dashboard/subdivs/subdiv-list/subdiv-list.component';
import { SubdivFormComponent } from './components/admin-home/admin-dashboard/subdivs/subdiv-form/subdiv-form.component';
import { DesignationUpdateFormComponent } from './components/admin-home/admin-dashboard/designations/designation-update-form/designation-update-form.component';
import { AdmindivUpdateComponent } from './components/admin-home/admin-dashboard/admindivs/admindiv-update/admindiv-update.component';
import { SubdivUpdateComponent } from './components/admin-home/admin-dashboard/subdivs/subdiv-update/subdiv-update.component';
import { UserUpdateComponent } from './components/admin-home/admin-dashboard/users/user-update/user-update.component';

const routes: Routes = [
  {path:'', redirectTo:"home", pathMatch: "full"},
    {path: "home", component:AdminHomeComponent, children:[
        {path:'', redirectTo:"dashboard", pathMatch: "full"},
        {path: "dashboard", component: AdminDashboardComponent, children:[
            {path:'', redirectTo:"users", pathMatch: "full"},
            {path: "users", component: UsersComponent, children:[
              {path:'', redirectTo:"list", pathMatch: "full"},
              {path: "list", component: UserListComponent},
              {path: "form", component: UserFormComponent},
              {path: "update/:id", component: UserUpdateComponent},
            ]},
            {path:"designations", component: DesignationsComponent, children:[
              {path:'', redirectTo:"list", pathMatch: "full"},
              {path: "list", component: DesignationListComponent},
              {path: "form", component: DesignationFormComponent},
              {path: "update/:id", component: DesignationUpdateFormComponent},
            ]},
            {path: "admindivs", component: AdmindivsComponent, children:[
              {path:'', redirectTo:"list", pathMatch: "full"},
              {path: "list", component: admindivListComponent},
              {path: "form", component: AdmindivFormComponent},
              {path:"update/:id", component: AdmindivUpdateComponent}
            ]},
            {path: "subdivs", component: SubdivsComponent, children:[
              {path:'', redirectTo:"list", pathMatch: "full"},
              {path: "list", component: SubdivListComponent},
              {path: "form", component: SubdivFormComponent},
              {path:"update/:id", component: SubdivUpdateComponent}
            ]},
            {path: "vendors", component: VendorsComponent},
        ]}

    ]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

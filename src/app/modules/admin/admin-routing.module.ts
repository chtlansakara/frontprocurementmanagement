import { DesignationFormComponent } from './components/admin-home/designations/designation-form/designation-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { UserFormComponent } from './components/admin-home/users/user-form/user-form.component';
import { UserListComponent } from './components/admin-home/users/user-list/user-list.component';
import { UserUpdateComponent } from './components/admin-home/users/user-update/user-update.component';
import { DesignationsComponent } from './components/admin-home/designations/designations.component';
import { DesignationListComponent } from './components/admin-home/designations/designation-list/designation-list.component';
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
import { UsersComponent } from './components/admin-home/users/users.component';
import { AdminDashboardComponent } from './components/admin-home/admin-dashboard/admin-dashboard.component';


const routes: Routes = [
  {path:'', redirectTo:"home", pathMatch: "full"},
  {path: "home", component:AdminHomeComponent, children:[
            {path:'', redirectTo:"users", pathMatch: "full"},
            {path: "dashboard", component: AdminDashboardComponent},
            {path: "users", component: UsersComponent ,children:[
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
              {path: "list", component: admindivListComponent },
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

        ]
      },


    // {path:"**", redirectTo: "home"}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

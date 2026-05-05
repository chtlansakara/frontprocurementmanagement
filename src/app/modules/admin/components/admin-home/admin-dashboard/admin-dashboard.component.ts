import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {
   items = [
    {icon: 'perm_identity', title: 'Users', description: 'Create & view users.', path:'users'},
    {icon: 'work_outline', title: 'Designations', description: 'Create & view designations.', path:'designations'},
    {icon: 'business', title: 'Admin Divisions', description: 'Create & view admin divisions.', path:'admindivs'},
    {icon: 'account_balance', title: 'Sub-divisions', description: 'Create & view sub divisions.', path:'subdivs'},
    {icon: 'category', title: 'Vendors', description: 'Create & view vendors.', path:'vendors'},
    {icon: 'money_bag', title: 'Procurement Sources', description: 'Create & view sources.', path:'sources'},
    {icon: 'timeline', title: 'Procurement Status', description: 'Create & view status.', path:'status'},

  ]
}

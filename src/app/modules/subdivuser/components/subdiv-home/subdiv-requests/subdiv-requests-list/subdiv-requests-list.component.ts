import { SubdivService } from './../../../../services/subdiv.service';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RequestDto } from '../../../../../../interfaces/RequestDto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SpinnerService } from '../../../../../../common/services/spinner.service';
import { UtilService } from '../../../../../../utils/util.service';


@Component({
  selector: 'app-subdiv-requests-list',
  standalone: false,
  templateUrl: './subdiv-requests-list.component.html',
  styleUrl: './subdiv-requests-list.component.scss'
})
export class SubdivRequestsListComponent {
  //to save returned list
  requestsList : RequestDto[] = [];


  diplayedColumns: string[] = [
    'id',
    'title',
    // 'description',
    'quantity',
    'fund',
    'estimation',

    'authorizedBy',
    'approvedDate',
    'status',

    'userRoleCreatedBy',
     'createdDate',

    'emailCreatedBy',
    'employeeIdCreatedBy',

    'previouslyPurchased',
    'previousPurchaseYear',
    'reasonForRequirement',
    // 'actions'
  ];

  constructor(
    public spinnerService: SpinnerService,
    private subdivService: SubdivService,
    private router : Router,
    public utilService: UtilService
  ){}

  datasource = new MatTableDataSource<RequestDto>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(){
    //loading the list from backend
    this.loadList();
  }

  loadList(){
    this.subdivService.getRequestsOfSubdiv().subscribe(res=>{
      //assign to class array
      this.requestsList = res;
      //set table data source
      this.datasource.data = res;
    })
  }

  ngAfterViewInit(): void{
    this.datasource.sort = this.sort;
    this.datasource.paginator = this.paginator;
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
  }

  //to view each row on click event
ViewRequest(row: RequestDto){
  this.router.navigateByUrl("/subdivuser/home/requests/view/"+row.id);
}

  //status formatting
  // getStatusClass(status: string): string{
  //   switch(status) {
  //     case 'PENDING_ADMIN_APPROVAL':
  //       return 'status-admin-pending';

  //     case 'REJECTED_ADMIN_APPROVAL':
  //       return 'status-admin-rejected';

  //     case 'PENDING_SUPPLIES_APPROVAL':
  //       return 'status-supplies-pending';

  //     case 'REJECTED_SUPPLIES_APPROVAL':
  //       return 'status-supplies-rejected';

  //     case 'PENDING_PROCUREMENT':
  //       return 'status-pending-procurement';

  //     case 'PROCUREMENT_CREATED':
  //       return 'status-procuremnt-created';

  //         //postponed request - after approved by supplies
  //     // case 'PROCUREMENT_POSTPONED':
  //     //   return 'status-procuremnt-created';

  //     //   //cancelled request - after approved by supplies
  //     // case 'PROCUREMENT_CANCELLED':
  //     //   return 'status-procuremnt-created';

  //     default:
  //       return 'status-default';
  //   }
  // }

  //format status on html
  // formatStatus(status: string): string{



    // switch(status) {
    //   case 'PENDING_ADMIN_APPROVAL':
    //     return 'PENDING ADMIN';

    //   case 'REJECTED_ADMIN_APPROVAL':
    //     return 'X ADMIN';

    //     //when directed to supplies approval
    //   case 'PENDING_SUPPLIES_APPROVAL':
    //     return 'Pending Supplies';

    //   case 'REJECTED_SUPPLIES_APPROVAL':
    //     return 'X Supplies';

    //     //when approved by supplies
    //   case 'PENDING_PROCUREMENT':
    //     return '✔ Supplies';

    //     //when a procurement is created for the request
    //   case 'PROCUREMENT_CREATED':
    //     return 'In Procurment';

    //     //postponed request - after approved by supplies
    //   case 'PROCUREMENT_POSTPONED':
    //     return 'Postponed';

    //     //cancelled request - after approved by supplies
    //   case 'PROCUREMENT_CANCELLED':
    //     return 'Cancelled';

    //   default:
    //     return 'Not defined';
//   }
// }

//format previously purchased column

// formatBoolean(value: boolean): string{
//   if(value == true) return 'Yes';
//   if(value == false) return 'No';
//   return ' ';
// }





}

import { Component, ViewChild } from '@angular/core';
import { RequestDto } from '../../../../../../../interfaces/RequestDto';
import { SpinnerService } from '../../../../../../../common/services/spinner.service';
import { Router } from '@angular/router';
import { UtilService } from '../../../../../../../utils/util.service';
import { SuppliesService } from '../../../../../services/supplies.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-supplies-requests-list-pending',
  standalone: false,
  templateUrl: './supplies-requests-list-pending.component.html',
  styleUrl: './supplies-requests-list-pending.component.scss'
})
export class SuppliesRequestsListPendingComponent {
  //to save returned list
  requestsList : RequestDto[] = [];


  diplayedColumns: string[] = [

    'id',
    'title',
    // 'description',
    'subdivCodeList',
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
    private suppliesService: SuppliesService,
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
    this.suppliesService.getPendingRequests().subscribe(res=>{
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
  this.router.navigateByUrl("/suppliesuser/home/requests/view/"+row.id);
}


}






import { Component, ViewChild } from '@angular/core';
import { RequestDto } from '../../../../../../../interfaces/RequestDto';
import { AdmindivService } from '../../../../../services/admindiv.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UtilService } from '../../../../../../../utils/util.service';

@Component({
  selector: 'app-admindiv-approved',
  standalone: false,
  templateUrl: './admindiv-approved.component.html',
  styleUrl: './admindiv-approved.component.scss'
})
export class AdmindivApprovedComponent {
//to save returned list
  requestsList : RequestDto[] = [];

  //table columns (names must match with returned object)
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
  ];

  constructor(
    private admindivService: AdmindivService,
    private router: Router,
    public utilService: UtilService
  ){}

  //for table - empty data source initialized
  datasource = new MatTableDataSource<RequestDto>();
  //for paginator and sort of the table
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //initialize the class list with object
  ngOnInit(){
    this.loadList();
  }

  //method calling the backend to load the list
  loadList(){
    this.admindivService.getApprovedRequests().subscribe(res => {
      this.requestsList = res;
      //set the table datasource
      this.datasource.data = res;
    });
  }

//to view each row on click event
ViewRequest(row: RequestDto){
  this.router.navigateByUrl("/admindivuser/home/requests/view/"+row.id);
}




  //for sort and paginator operations
   ngAfterViewInit(): void{
    this.datasource.sort = this.sort;
    this.datasource.paginator = this.paginator;
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
  }





}

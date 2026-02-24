import { AdmindivService } from './../../../../../../admindivuser/services/admindiv.service';
import { Component, ViewChild } from '@angular/core';
import { RequestDto } from '../../../../../../../interfaces/RequestDto';
import { SpinnerService } from '../../../../../../../common/services/spinner.service';
import { SuppliesService } from '../../../../../services/supplies.service';
import { Router } from '@angular/router';
import { UtilService } from '../../../../../../../utils/util.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-supplies-requests-list-all',
  standalone: false,
  templateUrl: './supplies-requests-list-all.component.html',
  styleUrl: './supplies-requests-list-all.component.scss'
})
export class SuppliesRequestsListAllComponent {
//to save returned list
  requestsList : RequestDto[] = [];

//track filters
searchFilter = '';
statusFilter = '';

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
    // 'employeeIdCreatedBy',


    'previouslyPurchased',
    'previousPurchaseYear',
    'reasonForRequirement',
  ];

  constructor(
    public spinnerService: SpinnerService,
    private suppliesService : SuppliesService,
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
      setTimeout(() => {
    this.loadList();
  }, 500);

// for status filter -----------------------------------
  //set filter predicate to handle both text and status filters
  this.datasource.filterPredicate=(data: RequestDto, filter: string) =>{
    const searchTerms = JSON.parse(filter);

    //text search
    const textMatch =
    !searchTerms.text ||
    (data.title + ' ' + data.subdivCodeList.join(' ')+ ' ' + data.authorizedBy)
    .toLowerCase()
    .includes(searchTerms.text.toLowerCase());

    //status search
    const statusMatch =
    !searchTerms.status || data.status === searchTerms.status;

    return textMatch && statusMatch;
  };

  }

  //method calling the backend to load the list
  loadList(){
    //to show progress spinner
    // this.loading = true;

    //server call
    this.suppliesService.getAllRequests()
    .subscribe(res => {
      this.requestsList = res;
      //set the table datasource
      this.datasource.data = res;

    });
  }

//to view each row on click event
ViewRequest(row: RequestDto){
  this.router.navigateByUrl("/suppliesuser/home/requests/view/"+row.id);
}

  //for sort and paginator operations
   ngAfterViewInit(): void{
    this.datasource.sort = this.sort;
    this.datasource.paginator = this.paginator;
  }
// for status filter ------------------------------------------------
  applyFilter(event: Event){
    // const filterValue = (event.target as HTMLInputElement).value;
    // this.datasource.filter = filterValue.trim().toLowerCase();

    this.searchFilter =(event.target as HTMLInputElement).value.trim().toLowerCase();
    this.applyCombinedFilter();
  }

  //status filter method
  applyStatusFilter(status:string){
    this.statusFilter = status;
    this.applyCombinedFilter();
  }

  //using both filters
  applyCombinedFilter(){
    this.datasource.filter =JSON.stringify({
      text: this.searchFilter,
      status: this.statusFilter
    });

     //reset paiginator to first page
  if(this.datasource.paginator){
    this.datasource.paginator.firstPage();
  }
  }

// -------------------------------------------------------

  mapUserRole(userrole: string): string{
    if(userrole == "SUBDIVUSER") return 'Sub-division';
    if(userrole == "ADMINDIVUSER") return 'Admin-division';
    else return "Supplies Division";
  }
}

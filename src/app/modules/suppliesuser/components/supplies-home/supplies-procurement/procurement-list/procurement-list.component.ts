import { Component, ViewChild } from '@angular/core';
import { ProcurementResponseDto } from '../../../../../../interfaces/ProcurementResponseDto';
import { SpinnerService } from '../../../../../../common/services/spinner.service';
import { SuppliesService } from '../../../../services/supplies.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-procurement-list',
  standalone: false,
  templateUrl: './procurement-list.component.html',
  styleUrl: './procurement-list.component.scss'
})
export class ProcurementListComponent {
  //to save returned list
  procurementList : ProcurementResponseDto[] = [];
  //to save status list
  statusList : any[] =[];
  //to show subdiv codes of each request-
    //requests List
  approvedRequestsList : any[] = [];
  //fast look up for add/remove chips
  requestsMap = new Map<number, any>();

  //track filters
searchFilter = '';
statusFilter = '';

 //table columns (names must match with returned object)
   diplayedColumns: string[] = [
    'id',
    // 'number',
    'name',
    'requestTitleList',

    'quantity',
    'estimatedAmount',
    'category',
     'source',

    'method',
    'authorityLevel',
    'priorityStatus',
    'scheduledCommenceDate',


    'statusName',


    'vendorName',
    'vendorRegisteredDate',
    "vendorComments",
    // 'vendorDetails',

    'expectedCompletionDate',

    'assignedToUserEmail',
    // 'assignedToUsername',
    // 'assignedToEmployeeId',
    'assignedToUserDesignation',


    'remarks',
    'donorName',


    // 'requestIdList',

    'createdOn',
    'emailCreatedBy',
    'designationCreatedBy',

    // 'lastUpdatedOn',
    // 'emailLastUpdatedBy',
    // 'designationUpdatedBy'
  ];

  constructor(
    public spinnerService : SpinnerService,
    private suppliesService: SuppliesService,
    private router : Router
  ){}

  //for table - empty data source initialized
  datasource = new MatTableDataSource<ProcurementResponseDto>();
  //for paginator and sort of the table
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

    //initialize the class list with object
  ngOnInit(){
    this.loadStatusList();
    this.loadList();
     this.loadRequests();

    // for status filter -----------------------------------
      //set filter predicate to handle both text and status filters
      this.datasource.filterPredicate=(data: ProcurementResponseDto, filter: string) =>{
        const searchTerms = JSON.parse(filter);

        //text search
        const textMatch =
        !searchTerms.text ||
        (data.name + ' ' + data.requestTitleList.join(' ')+ ' ' + data.statusName)
        .toLowerCase()
        .includes(searchTerms.text.toLowerCase());

        //status search
        const statusMatch =
        !searchTerms.statusName || data.statusName?.toLowerCase() === searchTerms.statusName.toLowerCase();

        return textMatch && statusMatch;
      };
  }

  //method calling the backend to load the list
  loadList(){
    //server call
    this.suppliesService.getAllProcurement()
    .subscribe(res => {
      this.procurementList= res;
      //set the table datasource
      this.datasource.data = res;
    });
  }


  //to get status list
  loadStatusList(){
    this.suppliesService.getProcurementStatus().subscribe(res => {
      this.statusList = res;
    })
  }



  // for filters & sort

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
    //filter only accepts a string
    this.datasource.filter =JSON.stringify({
      text: this.searchFilter,
      statusName: this.statusFilter
    });

     //reset paiginator to first page
    if(this.datasource.paginator){
     this.datasource.paginator.firstPage();
    }
  }


  ViewProcurement(row: ProcurementResponseDto){
    this.router.navigateByUrl("/suppliesuser/home/procurement/view/"+row.id);

  }

  // to get request info - to show subdiv code list of each request

  //pending procurement requests
  loadRequests(){
    this.suppliesService.getRequestsForUpdateProcurement().subscribe(res => {
      this.approvedRequestsList = res;
      //build the request map
      this.buildRequestMap();
    })
  }


    //creating a map with request id -> request object
    buildRequestMap(){
      this.approvedRequestsList.forEach((request:any)=>{
        this.requestsMap.set(request.id, request);
      });
    }

    //to find the title of each selected request
    getRequestById(id:number){
      return this.requestsMap.get(id);
    }



}

import { UtilService } from './../../../../../../utils/util.service';
import { Component, ViewChild } from '@angular/core';
import { ProcurementResponseDto } from '../../../../../../interfaces/ProcurementResponseDto';
import { SpinnerService } from '../../../../../../common/services/spinner.service';
import { AdmindivService } from '../../../../services/admindiv.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-admindiv-procurement-list',
  standalone: false,
  templateUrl: './admindiv-procurement-list.component.html',
  styleUrl: './admindiv-procurement-list.component.scss'
})
export class AdmindivProcurementListComponent {
//to save returned list
  procurementList : ProcurementResponseDto[] = [];
  //to save status list
  stagesList : any[] =[];
  //to show subdiv codes of each request-
    //requests List
  procurementRequestList : any[] = [];
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
    'requestTitle',
    'requestAdmindivCode',
    'requestSubdivCodeList',
    'quantity',
    'estimatedAmount',
    'procurementStage',
    'statusName',
   'commencedDate',
    'completedDate',

    'category',
     'sourceName',

    'method',
    'authorityLevel',
    'priorityStatus',
    'scheduledCommenceDate',
    'expectedCompletionDate',

    'vendorName',
    'vendorRegisteredDate',
    "vendorComments",
    // 'vendorDetails',

    'assignedToUserEmail',
    // 'assignedToUsername',
    // 'assignedToEmployeeId',
    'assignedToUserDesignation',

    'remarks',
    'donorName',

    'createdOn',
    'emailCreatedBy',
    'designationCreatedBy',

    // 'lastUpdatedOn',
    // 'emailLastUpdatedBy',
    // 'designationUpdatedBy'
  ];

  constructor(
    public spinnerService : SpinnerService,
    private admindivService: AdmindivService,
    private router : Router,
    public utilService: UtilService,
  ){}

  //for table - empty data source initialized
  datasource = new MatTableDataSource<ProcurementResponseDto>();
  //for paginator and sort of the table
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

    //initialize the class list with object
  ngOnInit(){
    this.loadStagesList();
    this.loadList();
     this.loadRequests();

    // for status filter -----------------------------------
      //set filter predicate to handle both text and status filters
      this.datasource.filterPredicate=(data: ProcurementResponseDto, filter: string) =>{
        const searchTerms = JSON.parse(filter);

        //text search
        const textMatch =
        !searchTerms.text ||
        (data.name + ' ' + data.requestTitle + ' ' + data.requestAdmindivCode
          + ' ' + data.requestAdmindivName + ' ' + data.requestSubdivCodeList.join(' ')
          + ' ' + data.requestEstimation + ' ' + data.statusName
          + ' ' +  this.utilService.formatProcurementStage(data.procurementStage) + ' '
          + data.vendorName + ' ' + data.commencedDate + data.completedDate)
        .toLowerCase()
        .includes(searchTerms.text.toLowerCase());

        //stages search
        const statusMatch =
        !searchTerms.procurementStage || data.procurementStage?.toLowerCase() === searchTerms.procurementStage.toLowerCase();
        return textMatch && statusMatch;
      };
  }

  //method calling the backend to load the list
  loadList(){
    //server call
    this.admindivService.getProcurement()
    .subscribe(res => {
      this.procurementList= res;
      console.log(this.procurementList);
      //set the table datasource
      this.datasource.data = res;
    });
  }


  //to get status list
  loadStagesList(){
    this.admindivService.getStages().subscribe(res => {
      this.stagesList = res;
    })
  }



  // for filters & sort

  //for sort and paginator operations
   ngAfterViewInit(): void{
    this.datasource.sort = this.sort;
    this.datasource.paginator = this.paginator;
  }
// for stages filter ------------------------------------------------
  applyFilter(event: Event){
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
      procurementStage: this.statusFilter
    });

     //reset paiginator to first page
    if(this.datasource.paginator){
     this.datasource.paginator.firstPage();
    }
  }


  ViewProcurement(row: ProcurementResponseDto){
    this.router.navigateByUrl("/admindivuser/home/procurement/view/"+row.id);

  }

  // to get request info - to show subdiv code list of each request

  //pending procurement requests
  loadRequests(){
    this.admindivService.getRequestsForProcurement().subscribe(res => {
      this.procurementRequestList = res;
      //build the request map
      this.buildRequestMap();
    })
  }


    //creating a map with request id -> request object
    buildRequestMap(){
      this.procurementRequestList.forEach((request:any)=>{
        this.requestsMap.set(request.id, request);
      });
    }

    //to find the title of each selected request
    getRequestById(id:number){
      return this.requestsMap.get(id);
    }


}

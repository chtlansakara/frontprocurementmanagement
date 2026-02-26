import { Component, ViewChild } from '@angular/core';
import { ProcurementResponseDto } from '../../../../../../interfaces/ProcurementResponseDto';
import { SpinnerService } from '../../../../../../common/services/spinner.service';
import { SuppliesService } from '../../../../services/supplies.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
//for export table
import * as XLSX from 'xlsx';
import { UtilService } from '../../../../../../utils/util.service';

@Component({
  selector: 'app-procurement-list',
  standalone: false,
  templateUrl: './procurement-list.component.html',
  styleUrl: './procurement-list.component.scss'
})
export class ProcurementListComponent {
  //to save returned list
  procurementList : ProcurementResponseDto[] = [];
  //to save stages list
  stagesList : any[] =[];
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
    private suppliesService: SuppliesService,
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
    this.suppliesService.getAllProcurement()
    .subscribe(res => {
      this.procurementList= res;
      //set the table datasource
      this.datasource.data = res;
    });
  }


  //to get status list
  loadStatusList(){
    this.suppliesService.getStages().subscribe(res => {
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
      procurementStage: this.statusFilter
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

    //button click event method to export file
    executeExportExcel(){
      this.exportToExcel("procurement-table","procurement");
    }
    executeExportCSV(){
      this.exportToCsv("procurement-table","procurement");
    }

    //function to export table as Excel file - passing table #id and the file name as arguments
    exportToExcel(tableId: string, name?:string){
      //getting timestamp to name the fild
      let timeSpan = new Date().toISOString();
      let prefix = name || "ExportResult";
      let fileName = `${prefix}-${timeSpan}`;
      //get table from id value
      let targetTableElement = document.getElementById(tableId);
      if(targetTableElement != null){
        //creating a work-book
        let wb = XLSX.utils.table_to_book(targetTableElement, <XLSX.Table2SheetOpts>{sheet: prefix});
        XLSX.writeFile(wb, `${fileName}.xlsx`)
      }
    }

    exportToCsv(tableId: string, name?: string) {
  let timeSpan = new Date().toISOString().replace(/[:.]/g, "-");
  let prefix = name || "ExportResult";
  let fileName = `${prefix}-${timeSpan}`;

  let targetTableElement = document.getElementById(tableId);

  if (targetTableElement != null) {
    let wb = XLSX.utils.table_to_book(targetTableElement, { sheet: prefix });

    XLSX.writeFile(wb, `${fileName}.csv`, {
      bookType: "csv"
    });
  }
}

}

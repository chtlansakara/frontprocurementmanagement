import { Component, ViewChild } from '@angular/core';
import { SpinnerService } from '../../../../../../common/services/spinner.service';
import { SuppliesService } from '../../../../services/supplies.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-audit-log',
  standalone: false,
  templateUrl: './audit-log.component.html',
  styleUrl: './audit-log.component.scss'
})
export class AuditLogComponent {
   //to save returned list
   auditLogList : any[] = [];
    //to save status list
    actionList : any[] =['CREATED', 'UPDATED', 'DELETED', 'STATUS_CHANGED'];

    //track filters
  searchFilter = '';
  actionFilter = '';

   //table columns (names must match with returned object)
     diplayedColumns: string[] = [
      'id',
       'timestamp',
      'entityId',
       'email',
      'description',



      'employeeId',
      'action'
    ];

    constructor(
      public spinnerService : SpinnerService,
      private suppliesService: SuppliesService,
      private router : Router
    ){}

    //for table - empty data source initialized
    datasource = new MatTableDataSource<any>();
    //for paginator and sort of the table
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

      //initialize the class list with object
    ngOnInit(){

      this.loadList();

      // for status filter -----------------------------------
        //set filter predicate to handle both text and status filters
        this.datasource.filterPredicate=(data: any, filter: string) =>{
          const searchTerms = JSON.parse(filter);

          //text search
          const textMatch =
          !searchTerms.text ||
          (data.description + ' ' + data.timestamp + ' ' + data.employeeId+ ' '+ data.email)
          .toLowerCase()
          .includes(searchTerms.text.toLowerCase());

          //status search
          const actionMatch =
          !searchTerms.action || data.action?.toLowerCase() === searchTerms.action.toLowerCase();

          return textMatch && actionMatch;
        };
    }

    //method calling the backend to load the list
    loadList(){
      //server call
      this.suppliesService.getAuditLog()
      .subscribe(res => {
        this.auditLogList= res;
        //set the table datasource
        this.datasource.data = res;
      });
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
    applyActionFilter(action:string){
      this.actionFilter = action;
      this.applyCombinedFilter();
    }

    //using both filters
    applyCombinedFilter(){
      //filter only accepts a string
      this.datasource.filter =JSON.stringify({
        text: this.searchFilter,
        action: this.actionFilter
      });

       //reset paiginator to first page
      if(this.datasource.paginator){
       this.datasource.paginator.firstPage();
      }
    }


    // ViewProcurement(row: any){
    //   this.router.navigateByUrl("/suppliesuser/home/procurement/view/"+row.id);

    // }


}

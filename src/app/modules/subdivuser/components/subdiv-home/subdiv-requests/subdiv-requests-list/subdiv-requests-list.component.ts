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
  loaded = false;
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
      //set flag
      this.loaded = true;

       this.datasource.sort = this.sort;
    this.datasource.paginator = this.paginator;

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





}

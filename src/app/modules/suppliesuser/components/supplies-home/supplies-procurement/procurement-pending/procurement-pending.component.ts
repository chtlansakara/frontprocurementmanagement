import { Component, ViewChild } from '@angular/core';
import { RequestDto } from '../../../../../../interfaces/RequestDto';
import { SpinnerService } from '../../../../../../common/services/spinner.service';
import { SuppliesService } from '../../../../services/supplies.service';
import { Router } from '@angular/router';
import { UtilService } from '../../../../../../utils/util.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-procurement-pending',
  standalone: false,
  templateUrl: './procurement-pending.component.html',
  styleUrl: './procurement-pending.component.scss'
})
export class ProcurementPendingComponent {
//to save returned list
  requestsList : RequestDto[] = [];
//to select rows of the table (only one row can be selected so 'false')
  selection = new SelectionModel<RequestDto>(false, []);

  diplayedColumns: string[] = [
        'select',
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
    // this.suppliesService.getApprovedRequests().subscribe(res=>{
    this.suppliesService.getApprovedRequests().subscribe(res=>{
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
  this.router.navigateByUrl("/suppliesuser/home/procurement/request-view/"+row.id);
}


// for check box table
/** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.datasource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.datasource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: RequestDto): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }


// send selected request ids to the form component
  sendSelectedRequests(){
    // const selectedIds = this.selection.selected.map(row => row.id);
    const selectedRequests = this.selection.selected;
    if(selectedRequests.length === 0) return;

    //select first request from selection
    const request = selectedRequests[0];
    console.log(request);

    this.router.navigate(['/suppliesuser/home/procurement/form'],{state: {request : request}});
  }
}

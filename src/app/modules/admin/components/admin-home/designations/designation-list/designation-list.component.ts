import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from '../../../../services/admin.service';

@Component({
  selector: 'app-designation-list',
  standalone: false,
  templateUrl: './designation-list.component.html',
  styleUrl: './designation-list.component.scss'
})
export class DesignationListComponent {
 //array to save returned list
  designationsList: any[] = [];

 //column names in an array
  displayedColumns: string[] = ['title','code','actions'];

  //with the filter & sort - need an instance
  dataSource = new MatTableDataSource<any>([]);
  //with sorting - need to use ngAfterViewInit life cycle hook - & add viewChild
  @ViewChild(MatSort) sort!: MatSort;
  // for pagination
  @ViewChild(MatPaginator) paginator! : MatPaginator;

  //injecting services
  constructor(
    private adminService: AdminService,
    private snackbar: MatSnackBar,
    private router: Router,
  ){}

  ngOnInit(){
    //call when the component is initiated
    this.getDesignations();
  }

  //get from backend
  getDesignations(){
    this.adminService.getDesignations().subscribe(res=>{
      //assign to class array
      this.designationsList = res;
      this.dataSource.data= res;
      //print in the console
      // console.log(res);
    })
  }

  //life cycle hook for sort and pagination
  ngAfterViewInit(): void {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
  }

  //filter function
  applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  //delete designation method
  deleteDesignation(id: number){
    this.adminService.deleteDesignation(id).subscribe({
          next: () => {
    this.snackbar.open("Deleted successfully","Close",{duration:5000, panelClass:"snackbar-success"});
    setTimeout(() => this.getDesignations(), 200); // small delay ensures snackbar is visible
  },
  error: () => {
    // this.snackbar.open("Error deleting designation!","Close",{duration:5000, panelClass:"snackbar-error"});
  }

    })
  }
}

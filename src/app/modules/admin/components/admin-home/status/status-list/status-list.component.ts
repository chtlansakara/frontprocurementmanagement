import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../../../../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-status-list',
  standalone: false,
  templateUrl: './status-list.component.html',
  styleUrl: './status-list.component.scss'
})
export class StatusListComponent {
  //returned list
  statusList: any[] = [];

  //column names
  displayedColumns : String[] = ['name', 'actions'];


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
    this.getStatus();
  }

  //get from backend
  getStatus(){
    this.adminService.getStatus().subscribe(res=>{
      //assign to class array
      this.statusList = res;
      this.dataSource.data= res;
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


  //delete vendor method
  deleteStatus(id: number){
    this.adminService.deleteStatus(id).subscribe({
          next: () => {
    this.snackbar.open("Deleted successfully","Close",{duration:5000, panelClass:"snackbar-success"});
    setTimeout(() => this.getStatus(), 200); // small delay ensures snackbar is visible
  },
  error: () => {
    // this.snackbar.open("Error deleting designation!","Close",{duration:5000, panelClass:"snackbar-error"});
  }

    })
  }
}

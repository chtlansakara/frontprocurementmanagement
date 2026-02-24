import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from '../../../../services/admin.service';


@Component({
  selector: 'app-admindiv-list',
  standalone: false,
  templateUrl: './admindiv-list.component.html',
  styleUrl: './admindiv-list.component.scss'
})
export class admindivListComponent {
  //to save returned list
  admindivList: any[] =[];

  //column names in an array
  displayedColumns: string[] = ['name','code','email', 'telephone', 'address', 'responsibleDesignationCode','actions'];

  //  - with the filter & sort - need an instance
  dataSource = new MatTableDataSource<any>([]);

  // - with sorting - need to use ngAfterViewInit life cycle hook - & add viewChild
  @ViewChild(MatSort) sort!: MatSort;
  // for pagination
  @ViewChild(MatPaginator) paginator! : MatPaginator;


  //injecting constructor
  constructor(
    private adminService: AdminService,
    private snackbar: MatSnackBar,
    private router: Router
  ){}

  ngOnInit(){
    //load to class array
    this.getAdmindivs();
  }

  //get from backend
  getAdmindivs(){
    this.adminService.getAdmindivs().subscribe(res=>{
      //assign
      this.admindivList= res;
      //set table
      this.dataSource.data = res;
      //check in console
      // console.log(res);
    })
  }

    //life cycle hook for sort and pagination
  ngAfterViewInit(): void {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
  }

   // filter function
  applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //delete method
  deleteAdmindiv(id:number){
    this.adminService.deleteAdmindiv(id).subscribe({
      next: () => {
        this.snackbar.open("Deleted successfully","Close",{duration:5000, panelClass:"snackbar-success"});
        setTimeout(() => this.getAdmindivs(), 200);
      },
      error: () => {
        // this.snackbar.open("Error deleting admin division!","Close",{duration:5000, panelClass:"snackbar-error"});
      }
    });
  }
}

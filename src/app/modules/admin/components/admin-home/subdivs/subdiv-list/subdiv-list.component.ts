import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from '../../../../services/admin.service';


@Component({
  selector: 'app-subdiv-list',
  standalone: false,
  templateUrl: './subdiv-list.component.html',
  styleUrl: './subdiv-list.component.scss'
})
export class SubdivListComponent {

  //to save returned subdiv list
  subdivList: any[] = [];

  // column names in an array
  displayedColumns: string[] = ['admindivName','name','code','email', 'telephone', 'address','actions'];

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
    this.getSubdivs();
  }

  //get from backend
  getSubdivs(){
    this.adminService.getSubdivs().subscribe(res=>{
      //assign
      this.subdivList= res;
      //set table
      this.dataSource.data = res;
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
  deleteSubdiv(id:number){
    this.adminService.deleteSubdiv(id).subscribe({
      next: () => {
        this.snackbar.open("Deleted successfully","Close",{duration:5000, panelClass:"snackbar-success"});
        setTimeout(() => this.getSubdivs(), 200);
      },
      error: () => {
        // this.snackbar.open("Error deleting admin division!","Close",{duration:5000, panelClass:"snackbar-error"});
      }
    });
  }
}

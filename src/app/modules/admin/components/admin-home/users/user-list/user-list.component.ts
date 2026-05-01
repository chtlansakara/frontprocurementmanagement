import { AfterViewInit, Component, ViewChild } from '@angular/core';
// Material
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from '../../../../services/admin.service';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements AfterViewInit{
  //to save returned list
  usersList: any[] = [];
  //map to store pre-converted links
  downloadLinks: Map<number, string> = new Map();

  // column names in an array
  displayedColumns: string[] = ['name','email', 'userRole',
    'employeeId','birthdate',
    'subdivName', 'subdivCode','admindivName','nic','designationCode','recommendation', 'actions'];

  //without the filter or sort - table data from an external array
  //dataSource = usersList;

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
    // loading the list
    this.getUsers();
  }

  //get list from backend
  getUsers(){
    this.adminService.getUsers().subscribe(res=>{
      //assign to array
      this.usersList = res;
      //set table data source
      this.dataSource.data = res;

      //converting recommendation to links
      res.forEach((user: any) => {
        if(user.recommendation){
          const byteArray = Uint8Array.from(atob(user.recommendation), c => c.charCodeAt(0));
          const blob = new Blob([byteArray], {type: 'application/pdf'});
         this.downloadLinks.set(user.id, URL.createObjectURL(blob));
        }
      });
    });
  }

  //to clean up memory leaks
  ngOnDestroy(){
  this.downloadLinks.forEach(url => URL.revokeObjectURL(url));
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
  deleteUser(id: number){
    this.adminService.deleteUser(id).subscribe({
      next: () => {
        this.snackbar.open("Deleted successfully","Close",{duration:5000, panelClass:"snackbar-success"});
        setTimeout(() => this.getUsers(), 200);
      },
      error: () => {
        // this.snackbar.open("Error deleting user!","Close",{duration:5000, panelClass:"snackbar-error"});
      }
    });
  }


  convertToLink(file: any): any{
      const byteArray = Uint8Array.from(atob(file), c => c.charCodeAt(0));
            const blob = new Blob([byteArray], {type: 'application/pdf'});
            return URL.createObjectURL(blob);
  }

}

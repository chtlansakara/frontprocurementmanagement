import { Component } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-database',
  standalone: false,
  templateUrl: './database.component.html',
  styleUrl: './database.component.scss'
})
export class DatabaseComponent {

      //injecting dependencies
  constructor(
    private adminService: AdminService,
    private snackbar: MatSnackBar,
  ){}




  createBackup(){
    this.adminService.createBackup()
      .subscribe((res)=>{
          if(res!= null){
            //show success message
            this.snackbar.open(res,"Close",{duration:5000, panelClass:"snackbar-success"});
            }
      });
  }


  restoreDatabase(){
    this.adminService.restoreDatabase()
      .subscribe((res)=>{
          if(res!= null){
            //show success message
            this.snackbar.open(res,"Close",{duration:5000, panelClass:"snackbar-success"});
            }
      });
  }

}

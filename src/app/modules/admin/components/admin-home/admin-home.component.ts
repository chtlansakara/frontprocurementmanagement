import { UtilService } from './../../../../utils/util.service';
import { Component, inject } from '@angular/core';
import { StorageService } from '../../../../auth/services/storage.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../../../auth/services/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { SignoutBoxComponent } from '../../../../common/signout-box/signout-box.component';

@Component({
  selector: 'app-admin-home',
  standalone: false,
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.scss'
})
export class AdminHomeComponent {
   readonly dialog = inject(MatDialog);

  openSignoutDialog():void{
    const dialogRef =  this.dialog.open(SignoutBoxComponent,{
      data:{
        entity: 'admin user'
      }
    });

    dialogRef.afterClosed().subscribe(res =>{
      if(res  === true){
       this.logout();
      }
    });
  }


  loggedInfo: any ;
  loggedUser: string;


  constructor(
    private router:Router,
    public utilService: UtilService,
    private notificationService: NotificationService
  ){
     this.loggedInfo =  this.utilService.getUserInfo();
     this.loggedUser = `${this.loggedInfo.email}\n${this.loggedInfo.account}`
  }

  logout(){
     //stop notifications
    this.notificationService.disconnect();

    //to remove user details from local storage
    StorageService.logout();
    //navigate to login page
    this.router.navigateByUrl("/login");
  }
}

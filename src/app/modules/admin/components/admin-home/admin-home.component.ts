import { UtilService } from './../../../../utils/util.service';
import { Component } from '@angular/core';
import { StorageService } from '../../../../auth/services/storage.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../../../auth/services/notification.service';

@Component({
  selector: 'app-admin-home',
  standalone: false,
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.scss'
})
export class AdminHomeComponent {
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

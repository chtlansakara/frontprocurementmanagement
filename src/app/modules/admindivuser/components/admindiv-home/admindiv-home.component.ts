import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../../../auth/services/storage.service';
import { MatIcon } from '@angular/material/icon';
import { UtilService } from '../../../../utils/util.service';

@Component({
  selector: 'app-admindiv-home',
  standalone: false,
  templateUrl: './admindiv-home.component.html',
  styleUrl: './admindiv-home.component.scss'
})
export class AdmindivHomeComponent {
  loggedInfo: any ;
  loggedUser: string;


  constructor(
    private router:Router,
    public utilService: UtilService
  ){
     this.loggedInfo =  this.utilService.getUserInfo();
     this.loggedUser = `${this.loggedInfo.email}\n${this.loggedInfo.account}`

  }

  logout(){
    //to remove user details from local storage
    StorageService.logout();
    //navigate to login page
    this.router.navigateByUrl("/login");
  }
}

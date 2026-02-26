import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../../../auth/services/storage.service';
import { UtilService } from '../../../../utils/util.service';

@Component({
  selector: 'app-supplies-home',
  standalone: false,
  templateUrl: './supplies-home.component.html',
  styleUrl: './supplies-home.component.scss'
})
export class SuppliesHomeComponent {
   loggedInfo: any ;
  loggedUser: string;


   constructor(
    private router:Router,
    public utilService: UtilService
  ){
     this.loggedInfo =  this.utilService.getUserInfo();
     console.log(this.loggedInfo);
     this.loggedUser = `${this.loggedInfo.email}\n${this.loggedInfo.account}`

  }

  logout(){
    //to remove user details from local storage
    StorageService.logout();
    //navigate to login page
    this.router.navigateByUrl("/login");
  }

}

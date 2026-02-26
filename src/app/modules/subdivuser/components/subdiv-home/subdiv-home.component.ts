import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../../../auth/services/storage.service';
import { MatIcon } from '@angular/material/icon';
import { UtilService } from '../../../../utils/util.service';

@Component({
  selector: 'app-subdiv-home',
  standalone: false,
  templateUrl: './subdiv-home.component.html',
  styleUrl: './subdiv-home.component.scss'
})
export class SubdivHomeComponent {
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

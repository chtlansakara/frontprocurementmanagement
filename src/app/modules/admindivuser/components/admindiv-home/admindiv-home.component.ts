import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../../../auth/services/storage.service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-admindiv-home',
  standalone: false,
  templateUrl: './admindiv-home.component.html',
  styleUrl: './admindiv-home.component.scss'
})
export class AdmindivHomeComponent {
  constructor(
    private router:Router
  ){}

  logout(){
    //to remove user details from local storage
    StorageService.logout();
    //navigate to login page
    this.router.navigateByUrl("/login");
  }
}

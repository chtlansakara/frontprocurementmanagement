import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../../../auth/services/storage.service';

@Component({
  selector: 'app-supplies-home',
  standalone: false,
  templateUrl: './supplies-home.component.html',
  styleUrl: './supplies-home.component.scss'
})
export class SuppliesHomeComponent {
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

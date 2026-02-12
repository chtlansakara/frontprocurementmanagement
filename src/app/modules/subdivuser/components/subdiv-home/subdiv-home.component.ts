import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../../../auth/services/storage.service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-subdiv-home',
  standalone: false,
  templateUrl: './subdiv-home.component.html',
  styleUrl: './subdiv-home.component.scss'
})
export class SubdivHomeComponent {
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

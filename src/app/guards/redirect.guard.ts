import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../auth/services/storage.service';

export const redirectGuard: CanActivateFn = (route, state) => {

  //for navigation
  const router = inject(Router);

  //check if an user is not logged in
  if(!StorageService.isLoggedIn()){
      console.log("User is not logged in");
      return router.parseUrl('/login');
  }

  //get user role if logged in
  const role = StorageService.getUserRole();
  console.log("User's user role is "+ role);

  //redirecting to relevant home page by role
  if(role === "ADMIN"){
      return router.parseUrl("/adminuser/home");

    }else if(role === "SUPPLIESUSER"){
       return router.parseUrl("/suppliesuser/home");

    }else if(role === "ADMINDIVUSER"){
       return router.parseUrl("/admindivuser/home");

    }else if(role ==="SUBDIVUSER"){
       return router.parseUrl("/subdivuser/home");
    }




  return true;
};

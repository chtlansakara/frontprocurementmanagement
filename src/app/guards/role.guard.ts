import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../auth/services/storage.service';

export const roleGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);

   //check if an user is not logged in
  if(!StorageService.isLoggedIn()){
      return router.parseUrl('/login');
  }

  const userRole = StorageService.getUserRole();

  //check role from the route data
  const expectedRole = route.data['role'];


  if(userRole === expectedRole){
    return true;
  }

 //route to user role's home if access is restricted
    if(userRole === 'ADMIN') return router.parseUrl('/adminuser/home');
    if(userRole === 'SUPPLIESUSER') return router.parseUrl('/suppliesuser/home');
    if(userRole === 'ADMINDIVUSER') return router.parseUrl('/admindivuser/home');
    if(userRole === 'SUBDIVUSER') return router.parseUrl('/subdivuser/home');

    return router.parseUrl('/login');


};

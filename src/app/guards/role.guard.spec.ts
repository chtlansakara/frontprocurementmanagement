import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, provideRouter, Router, RouterStateSnapshot } from '@angular/router';

import { roleGuard } from './role.guard';
import { StorageService } from '../auth/services/storage.service';

describe('roleGuard', () => {
  //instances needed for a route guard
  let mockRoute: Partial<ActivatedRouteSnapshot>;
  let mockState: Partial<RouterStateSnapshot>;

  //dependencies as instances
  let mockRouter: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter([])]
    });
    //create instance
    mockRouter = TestBed.inject(Router);
    //route guard related instances - required for fn signature
    mockState = {};
  });

  //helper function to setup route with 'role'
   const executeGuard = (role: string) =>{
    mockRoute = { data: {role}};
    return TestBed.runInInjectionContext(() =>
      roleGuard(mockRoute as ActivatedRouteSnapshot, mockState as RouterStateSnapshot));
    }


  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  describe('when user NOT logged in' , () => {
    it('should redirect to login page', () => {
      //ARRANGE:
      spyOn(StorageService, 'isLoggedIn').and.returnValue(false);
      //ACT:
      const result = executeGuard('ADMIN');
      //ASSERT:
      expect(result).toEqual(mockRouter.parseUrl('/login'));
    });
  });

  describe('when user logged in' , () => {
    beforeEach(() => {
      spyOn(StorageService, 'isLoggedIn').and.returnValue(true);
    });

    describe('for ADMIN user', () => {
      beforeEach(() =>{
          spyOn(StorageService, 'getUserRole').and.returnValue('ADMIN');
        });

      it('should allow ADMIN route', () => {
        //ASSERT:
        expect(executeGuard('ADMIN')).toBeTrue();
      });

      it('should NOT allow SUPPLIES route & redirect to ADMIN home page', () => {
        //ASSERT:
        expect(executeGuard('SUPPLIESUSER')).toEqual(mockRouter.parseUrl('/adminuser/home'));
      });
      it('should NOT allow ADMINDIV route & redirect to ADMIN home page', () => {
        //ASSERT:
        expect(executeGuard('ADMINDIVUSER')).toEqual(mockRouter.parseUrl('/adminuser/home'));
      });
      it('should NOT allow SUBDIV route & redirect to ADMIN home page', () => {
        //ASSERT:
        expect(executeGuard('SUBDIVUSER')).toEqual(mockRouter.parseUrl('/adminuser/home'));
      });
    });

     describe('for SUPPLIES user', () => {
      beforeEach(() =>{
          spyOn(StorageService, 'getUserRole').and.returnValue('SUPPLIESUSER');
        });

      it('should allow SUPPLIES route', () => {
        //ASSERT:
        expect(executeGuard('SUPPLIESUSER')).toBeTrue();
      });

      it('should NOT allow ADMIN route & redirect to SUPPLIES home page', () => {
        //ASSERT:
        expect(executeGuard('ADMIN')).toEqual(mockRouter.parseUrl('/suppliesuser/home'));
      });
      it('should NOT allow ADMINDIV route & redirect to SUPPLIES home page', () => {
        //ASSERT:
        expect(executeGuard('ADMINDIVUSER')).toEqual(mockRouter.parseUrl('/suppliesuser/home'));
      });
      it('should NOT allow SUBDIV route & redirect to SUPPLIES home page', () => {
        //ASSERT:
        expect(executeGuard('SUBDIVUSER')).toEqual(mockRouter.parseUrl('/suppliesuser/home'));
      });
    });


    describe('for ADMINDIV user', () => {
      beforeEach(() =>{
          spyOn(StorageService, 'getUserRole').and.returnValue('ADMINDIVUSER');
        });

      it('should allow ADMINDIV route', () => {
        //ASSERT:
        expect(executeGuard('ADMINDIVUSER')).toBeTrue();
      });

      it('should NOT allow ADMIN route & redirect to ADMINDIV home page', () => {
        //ASSERT:
        expect(executeGuard('ADMIN')).toEqual(mockRouter.parseUrl('/admindivuser/home'));
      });
      it('should NOT allow SUPPLIES route & redirect to ADMINDIV home page', () => {
        //ASSERT:
        expect(executeGuard('SUPPLIESUSER')).toEqual(mockRouter.parseUrl('/admindivuser/home'));
      });
      it('should NOT allow SUBDIV route & redirect to ADMINDIV home page', () => {
        //ASSERT:
        expect(executeGuard('SUBDIVUSER')).toEqual(mockRouter.parseUrl('/admindivuser/home'));
      });
    });

    describe('for SUBDIV user', () => {
      beforeEach(() =>{
          spyOn(StorageService, 'getUserRole').and.returnValue('SUBDIVUSER');
        });

      it('should allow SUBDIV route', () => {
        //ASSERT:
        expect(executeGuard('SUBDIVUSER')).toBeTrue();
      });

      it('should NOT allow ADMIN route & redirect to SUBDIV home page', () => {
        //ASSERT:
        expect(executeGuard('ADMIN')).toEqual(mockRouter.parseUrl('/subdivuser/home'));
      });
      it('should NOT allow SUPPLIES route & redirect to SUBDIV home page', () => {
        //ASSERT:
        expect(executeGuard('SUPPLIESUSER')).toEqual(mockRouter.parseUrl('/subdivuser/home'));
      });
      it('should NOT allow ADMINDIV route & redirect to SUBDIV home page', () => {
        //ASSERT:
        expect(executeGuard('ADMINDIVUSER')).toEqual(mockRouter.parseUrl('/subdivuser/home'));
      });
    });

     describe('for OTHER user', () => {
      beforeEach(() =>{
          spyOn(StorageService, 'getUserRole').and.returnValue('Other');
        });

      it('should NOT allow ADMIN route & redirect to login page', () => {
        //ASSERT:
        expect(executeGuard('ADMIN')).toEqual(mockRouter.parseUrl('/login'));
      });
      it('should NOT allow SUPPLIES route & redirect to login page', () => {
        //ASSERT:
        expect(executeGuard('SUPPLIESUSER')).toEqual(mockRouter.parseUrl('/login'));
      });
      it('should NOT allow ADMINDIV route & redirect to login page', () => {
        //ASSERT:
        expect(executeGuard('ADMINDIVUSER')).toEqual(mockRouter.parseUrl('/login'));
      });
       it('should NOT allow SUBDIV route & redirect to login page', () => {
        //ASSERT:
        expect(executeGuard('SUBDIVUSER')).toEqual(mockRouter.parseUrl('/login'));
      });
    });


  });



});

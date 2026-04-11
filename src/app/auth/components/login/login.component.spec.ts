import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { provideHttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA, signal } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { of } from 'rxjs';
import { provideRouter, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from '../../services/notification.service';

const mockAuthResponse = {
    "jwt": "djdjflkdjow299frjfjdlfj02wuj",
    "id": 28,
    "userRole" : 'SUPPLIESUSER',
    "email": 'supplies@test.com',
    "name": 'Ranjani',
    "subdivName":'Supplies Division',
    "subdivCode":'SUPPLIES',
    "admindivName":'Administration',
    "admindivCode":'ADMIN'
};

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  //dependencies as spies
  let mockAuthService: jasmine.SpyObj<AuthService>;
   let mockMatSnackbar : jasmine.SpyObj<MatSnackBar>;
  //dependencies as intances
  let mockRouter: Router;

      //to hold NotificationService mock instance - using intersection to add two signals
  let mockNotificationService : jasmine.SpyObj<NotificationService> & {
    notifications : ReturnType<typeof signal<any[]>>;
    unreadCount : ReturnType<typeof signal<number>>;
  };


  beforeEach(async () => {
    //spy objects - initialization
    mockAuthService = jasmine.createSpyObj('AuthService', ['login']);
    mockMatSnackbar = jasmine.createSpyObj('MatSnackbar', ['open']);

            //signals are added later to the spy object for notification service dependency
     mockNotificationService = {
      ...jasmine.createSpyObj('NotificationService', ['connect', 'disconnect', 'markRead', 'markAllRead']),
      notifications: signal([]),
      unreadCount: signal(0)
    };


    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
       providers: [
        provideHttpClient(),
        {provide: AuthService, useValue: mockAuthService},
        provideRouter([]),
        {provide: MatSnackBar, useValue: mockMatSnackbar},
         {provide: NotificationService, useValue: mockNotificationService}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    //instance for router
    mockRouter = TestBed.inject(Router);


    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('togglePasswordVisibility', () => {
    it('should show password when called once', () => {
      //ACT:
      component.togglePasswordVisibility();
      //ASSERT:
      expect(component.hidePassword).toBeFalse();
    });
    it('should hide password when called twice', () => {
      //ACT:
      component.togglePasswordVisibility();
      component.togglePasswordVisibility();
      //ASSERT:
      expect(component.hidePassword).toBeTrue();
    });
  });

  describe('loginUser', () => {
    it('should call service with login details', () => {
      //ARRANGE:
      //setup retun values
      mockAuthService.login.and.returnValue(of(mockAuthResponse));
      //ACT:
      component.loginUser();
      //ASSERT:
      expect(mockAuthService.login).toHaveBeenCalledOnceWith(component.loginForm.value);
    });

    describe('navigation by user role', () => {
      it('should navigate to ADMIN home page when ADMIN', () => {
        //ARRANGE:
        mockAuthResponse.userRole = 'ADMIN';
        //setup retun values
        mockAuthService.login.and.returnValue(of(mockAuthResponse));
        spyOn(mockRouter, 'navigateByUrl');
        //ACT:
        component.loginUser();
        //ASSERT:
        expect(mockRouter.navigateByUrl).toHaveBeenCalledOnceWith('/adminuser/home');
      });
       it('should navigate to SUPPLIES home page when SUPPLIESUSER', () => {
        //ARRANGE:
        mockAuthResponse.userRole = 'SUPPLIESUSER';
        //setup retun values
        mockAuthService.login.and.returnValue(of(mockAuthResponse));
        spyOn(mockRouter, 'navigateByUrl');
        //ACT:
        component.loginUser();
        //ASSERT:
        expect(mockRouter.navigateByUrl).toHaveBeenCalledOnceWith('/suppliesuser/home');
      });
       it('should navigate to ADMINDIV home page when ADMINDIVUSER', () => {
        //ARRANGE:
        mockAuthResponse.userRole = 'ADMINDIVUSER';
        //setup retun values
        mockAuthService.login.and.returnValue(of(mockAuthResponse));
        spyOn(mockRouter, 'navigateByUrl');
        //ACT:
        component.loginUser();
        //ASSERT:
        expect(mockRouter.navigateByUrl).toHaveBeenCalledOnceWith('/admindivuser/home');
      });
       it('should navigate to SUBDIV home page when SUBDIVUSER', () => {
        //ARRANGE:
        mockAuthResponse.userRole = 'SUBDIVUSER';
        //setup retun values
        mockAuthService.login.and.returnValue(of(mockAuthResponse));
        spyOn(mockRouter, 'navigateByUrl');
        //ACT:
        component.loginUser();
        //ASSERT:
        expect(mockRouter.navigateByUrl).toHaveBeenCalledOnceWith('/subdivuser/home');
      });
      it('should show success snackbar when login is successful', () => {
        //ASSERT:
        //setup retun values
        mockAuthService.login.and.returnValue(of(mockAuthResponse));
        //ACT:
        component.loginUser();
        //ASSERT:
        expect(mockMatSnackbar.open).toHaveBeenCalledOnceWith("Login successful!","Close",{duration:5000, panelClass:"snackbar-success"});

      })
    })
  });

});

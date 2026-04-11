import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { SuppliesHomeComponent } from './supplies-home.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, Router } from '@angular/router';
import { NotificationService } from '../../../../auth/services/notification.service';
import { ToastService } from '../../../../auth/services/toast.service';
import { ChangeDetectorRef, inject, NO_ERRORS_SCHEMA, signal } from '@angular/core';
import { UtilService } from '../../../../utils/util.service';
import { StorageService } from '../../../../auth/services/storage.service';
import { AppNotification } from '../../../../interfaces/NotificationDto';
//has to import this to avoid 'matMenu' not found error
import { MatMenuModule } from '@angular/material/menu';

describe('SuppliesHomeComponent', () => {
  let component: SuppliesHomeComponent;
  let fixture: ComponentFixture<SuppliesHomeComponent>;
  //hold real router instance
  let router : Router;
  //to hold dependeny mock instances
  let  mockUtilService : jasmine.SpyObj<UtilService>;

  //to hold NotificationService mock instance - using intersection to add two signals
  let mockNotificationService : jasmine.SpyObj<NotificationService> & {
    notifications : ReturnType<typeof signal<any[]>>;
    unreadCount : ReturnType<typeof signal<number>>;
  };



  beforeEach(async () => {
    mockUtilService = jasmine.createSpyObj('UtilService',['getUserInfo']);


    //signals are added later to the spy object for notification service dependency
     mockNotificationService = {
      ...jasmine.createSpyObj('NotificationService', ['connect', 'disconnect', 'markRead', 'markAllRead']),
      notifications: signal([]),
      unreadCount: signal(0)
    };


    await TestBed.configureTestingModule({
      imports: [MatMenuModule], // to resolve the matMenu exportAs reference
      declarations: [SuppliesHomeComponent],
      providers: [
        provideHttpClient(),
       {provide: UtilService, useValue: mockUtilService},
       provideRouter([]),
       {provide: NotificationService, useValue: mockNotificationService}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    //router instance
    router = TestBed.inject(Router);

    //set return for mocked method in the constructor before creating the component
    const mockUserInfo = {
      email: 'test@test.com',
      account: 'Supplies User'
    };
    mockUtilService.getUserInfo.and.returnValue(mockUserInfo);



    fixture = TestBed.createComponent(SuppliesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    //verify
    expect(mockUtilService.getUserInfo).toHaveBeenCalled();
  });

  describe('ngOnInit', () => {
    it('should call notificationService.connect() once', () => {
      //verify
      expect(mockNotificationService.connect).toHaveBeenCalledTimes(1);
    });
  });

   describe('logout', () => {
     it('should call StorageService.logout() once & navigate to /login', () => {
      //arrange
      spyOn(StorageService, 'logout');
      spyOn(router,'navigateByUrl');
      //act
      component.logout();
      //verify
      expect(mockNotificationService.disconnect).toHaveBeenCalledTimes(1);
      expect(StorageService.logout).toHaveBeenCalledTimes(1);
      expect(router.navigateByUrl).toHaveBeenCalledWith("/login");
    });
  });



  describe('ngOnDestroy', () => {
     it('should call notificationService.disconnect()', () => {
      //act: trigger ngOnDestroy()
      fixture.destroy();
      //verify
      expect(mockNotificationService.disconnect).toHaveBeenCalled();
    });
  });


  describe('onNotificationClick', () => {
      let mockNotification: AppNotification ;

      beforeEach(()=>{
        mockNotification = {
        id: 2,
        message: "Request is approved",
        type: 'PROCUREMENT_CREATED',
        referenceType: 'REQUEST',
        referenceId : 1,
        userId : 1,
        isRead: true,
        createdAt : "2026/2/3"
      }

         // navigateByUrl MUST return a Promise because .then() is called on it
        spyOn(router, 'navigateByUrl').and.returnValue(Promise.resolve(true));
      });

     it('should call markRead when notification is unread', () => {
      //arrange
      mockNotification.isRead = false;
      //act
      component.onNotificationClick(mockNotification);
      //verify
      expect(mockNotificationService.markRead).toHaveBeenCalledWith(mockNotification.id);
    });

     it('should not call markRead when notification is already read', () => {
      //act
      component.onNotificationClick(mockNotification);
      //verify
      expect(mockNotificationService.markRead).not.toHaveBeenCalledWith(mockNotification.id);
    });

      it('should navigate to view request route when type is Request', fakeAsync(() => {
        //arrange
        spyOn(router, 'navigate');
        //act
        component.onNotificationClick(mockNotification);
        tick();
        //verify
        expect(router.navigateByUrl).toHaveBeenCalledWith('/', { skipLocationChange: true });
        expect(router.navigate).toHaveBeenCalledWith(['/suppliesuser/home/requests/view/',mockNotification.referenceId ]);
      }));

       it('should navigate to view procurement route when type is Procurement', fakeAsync(() => {
        //arrange
        mockNotification.referenceType = 'PROCUREMENT';
        spyOn(router, 'navigate');
        //act
        component.onNotificationClick(mockNotification);
        tick();
        //verify
        expect(router.navigateByUrl).toHaveBeenCalledWith('/', { skipLocationChange: true });
        expect(router.navigate).toHaveBeenCalledWith(['/suppliesuser/home/procurement/view/',mockNotification.referenceId ]);
      }));
  });

   describe('doMarkAllRead', () => {
     it('should call notificationService.markAllRead() once', () => {
      //act:
      component.doMarkAllRead();
      //verify
      expect(mockNotificationService.markAllRead).toHaveBeenCalledTimes(1);
    });
  });





});

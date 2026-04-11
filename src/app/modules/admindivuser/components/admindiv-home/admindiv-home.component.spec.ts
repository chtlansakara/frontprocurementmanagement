import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindivHomeComponent } from './admindiv-home.component';
import { provideHttpClient } from '@angular/common/http';
import { UtilService } from '../../../../utils/util.service';
import { NO_ERRORS_SCHEMA, signal } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { NotificationService } from '../../../../auth/services/notification.service';

describe('AdmindivHomeComponent', () => {
  let component: AdmindivHomeComponent;
  let fixture: ComponentFixture<AdmindivHomeComponent>;

  let  mockUtilService : jasmine.SpyObj<UtilService>;
    //to hold NotificationService mock instance - using intersection to add two signals
  let mockNotificationService : jasmine.SpyObj<NotificationService> & {
    notifications : ReturnType<typeof signal<any[]>>;
    unreadCount : ReturnType<typeof signal<number>>;
  };


  beforeEach(async () => {
    //constructor method
        mockUtilService = jasmine.createSpyObj('UtilService',['getUserInfo']);
    //signals are added later to the spy object for notification service dependency
     mockNotificationService = {
      ...jasmine.createSpyObj('NotificationService', ['connect', 'disconnect', 'markRead', 'markAllRead']),
      notifications: signal([]),
      unreadCount: signal(0)
    };





    await TestBed.configureTestingModule({
      declarations: [AdmindivHomeComponent],
      imports: [MatMenuModule],
      providers: [
        provideHttpClient(),
        {provide: UtilService, useValue: mockUtilService},
        {provide: NotificationService, useValue: mockNotificationService}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();


    //set return for mocked method in the constructor before creating the component
    const mockUserInfo = {
      email: 'test@test.com',
      account: 'Admindiv User'
    };
    mockUtilService.getUserInfo.and.returnValue(mockUserInfo);

    fixture = TestBed.createComponent(AdmindivHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

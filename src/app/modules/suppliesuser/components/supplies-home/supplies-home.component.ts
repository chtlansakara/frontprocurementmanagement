import { ChangeDetectorRef, Component, effect, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../../../auth/services/storage.service';
import { UtilService } from '../../../../utils/util.service';
import { NotificationService } from '../../../../auth/services/notification.service';
import { ToastService } from '../../../../auth/services/toast.service';
import { AppNotification } from '../../../../interfaces/NotificationDto';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-supplies-home',
  standalone: false,
  templateUrl: './supplies-home.component.html',
  styleUrl: './supplies-home.component.scss'
})
export class SuppliesHomeComponent {
   loggedInfo: any ;
  loggedUser: string;

  notifications: AppNotification[] = [];
  unreadCount: number = 0;

  //to close notification menu
  @ViewChild(`notifTrigger`) notifTrigger!: MatMenuTrigger;


   constructor(
    private router:Router,
    public utilService: UtilService,
    public notificationService: NotificationService,
    public toastService: ToastService,
    private cdr: ChangeDetectorRef
  ){
     this.loggedInfo =  this.utilService.getUserInfo();

     this.loggedUser = `${this.loggedInfo.email}\n${this.loggedInfo.account}`
  }


  ngOnInit(){
    this.notificationService.connect();
  }

  ngDoCheck(): void {
  const newNotifications = this.notificationService.notifications();
  const newCount = this.notificationService.unreadCount();

    if (newCount !== this.unreadCount || newNotifications.length !== this.notifications.length) {
      this.notifications = newNotifications;
      this.unreadCount = newCount;
      this.cdr.markForCheck();
    }
  }

  logout(){
    //stop notifications
    this.notificationService.disconnect();

    //to remove user details from local storage
    StorageService.logout();
    //navigate to login page
    this.router.navigateByUrl("/login");
  }

  ngOnDestroy():void{
    this.notificationService.disconnect();
  }

  onNotificationClick(notification: AppNotification):void{
      if(!notification.isRead){
        this.notificationService.markRead(notification.id);
      }

      //navigate to relevant entity view page

      if(notification.referenceType === 'REQUEST'){

        // Navigate to dummy route first, then to actual target
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.notificationService.markRead(notification.referenceId);

        this.router.navigate(['/suppliesuser/home/requests/view/', notification.referenceId]);
      });

      }else if(notification.referenceType === 'PROCUREMENT'){
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.notificationService.markRead(notification.referenceId);
        this.router.navigate(['/suppliesuser/home/procurement/view/', notification.referenceId]);
      });
    }
  }


  getDotClass(type: string): string {
    const map: Record<string, string> = {
      'REQUEST_SUBMITTED':            'dot-yellow',
      'REQUEST_APPROVED_BY_ADMIN':    'dot-green',
      'REQUEST_REJECTED_BY_ADMIN':    'dot-red',
      'REQUEST_APPROVED_BY_SUPPLIES': 'dot-green',
      'REQUEST_REJECTED_BY_SUPPLIES': 'dot-red',
      'PROCUREMENT_CREATED':          'dot-blue',
      'PROCUREMENT_STATUS_UPDATE':    'dot-purple',
    };
    return map[type] ?? 'dot-gray';
  }

  getToastIcon(type: string): string {
    const map: Record<string, string> = {
      success: 'check_circle',
      error:   'error',
      warning: 'warning',
      info:    'info'
    };
    return map[type] ?? 'info';
  }

  doMarkAllRead(){
    this.notificationService.markAllRead();
  }

}

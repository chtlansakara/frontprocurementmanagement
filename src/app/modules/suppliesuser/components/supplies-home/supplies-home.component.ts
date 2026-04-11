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




  doMarkAllRead(){
    this.notificationService.markAllRead();
  }

}

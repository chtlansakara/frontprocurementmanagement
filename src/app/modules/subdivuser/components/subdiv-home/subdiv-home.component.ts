import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../../../auth/services/storage.service';
import { MatIcon } from '@angular/material/icon';
import { UtilService } from '../../../../utils/util.service';
import { NotificationService } from '../../../../auth/services/notification.service';
import { AppNotification } from '../../../../interfaces/NotificationDto';
import { ToastService } from '../../../../auth/services/toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-subdiv-home',
  standalone: false,
  templateUrl: './subdiv-home.component.html',
  styleUrl: './subdiv-home.component.scss'
})
export class SubdivHomeComponent {
  loggedInfo: any ;
  loggedUser: string;

  notifications: AppNotification[] = [];
    unreadCount: number = 0;



  constructor(
    private router:Router,
    public utilService: UtilService,
    private notificationService: NotificationService,
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
  onNotificationClick(notification: AppNotification):void{
      if(!notification.isRead){
        this.notificationService.markRead(notification.id);
      }

      //navigate to relevant entity view page

      if(notification.referenceType === 'REQUEST'){

        // Navigate to dummy route first, then to actual target
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.notificationService.markRead(notification.referenceId);

        this.router.navigate(['/subdivuser/home/requests/view/', notification.referenceId]);
      });

      }else if(notification.referenceType === 'PROCUREMENT'){
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.notificationService.markRead(notification.referenceId);
        this.router.navigate(['/subdivuser/home/procurement/view/', notification.referenceId]);
      });
    }
  }

   doMarkAllRead(){
    this.notificationService.markAllRead();
  }


  logout(){
    //stop notifications
    this.notificationService.disconnect();

    //to remove user details from local storage
    StorageService.logout();
    //navigate to login page
    this.router.navigateByUrl("/login");
  }
}

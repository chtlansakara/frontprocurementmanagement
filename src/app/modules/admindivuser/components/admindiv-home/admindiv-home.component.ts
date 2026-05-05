import { ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../../../auth/services/storage.service';
import { MatIcon } from '@angular/material/icon';
import { UtilService } from '../../../../utils/util.service';
import { NotificationService } from '../../../../auth/services/notification.service';
import { AppNotification } from '../../../../interfaces/NotificationDto';
import { ToastService } from '../../../../auth/services/toast.service';
import { MatDialog } from '@angular/material/dialog';
import { SignoutBoxComponent } from '../../../../common/signout-box/signout-box.component';


@Component({
  selector: 'app-admindiv-home',
  standalone: false,
  templateUrl: './admindiv-home.component.html',
  styleUrl: './admindiv-home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdmindivHomeComponent {
   readonly dialog = inject(MatDialog);

  openSignoutDialog():void{
    const dialogRef =  this.dialog.open(SignoutBoxComponent,{
      data:{
        entity: 'admindiv user'
      }
    });

    dialogRef.afterClosed().subscribe(res =>{
      if(res  === true){
       this.logout();
      }
    });
  }

   private cdr = inject(ChangeDetectorRef);
  loggedInfo: any ;
  loggedUser: string;

  //get notifications
  notifications: AppNotification[] = [];
  unreadCount: number = 0;


  constructor(
    private router:Router,
    public utilService: UtilService,
    public notificationService: NotificationService,
    public toastService : ToastService,
    // private cdr: ChangeDetectorRef
  ){
     this.loggedInfo =  this.utilService.getUserInfo();
     this.loggedUser = `${this.loggedInfo.email}\n${this.loggedInfo.account}`;

          // effect() registers this component as a reactive consumer of the signals.
    // When notifications or unreadCount change, markForCheck() fires.
    effect(() => {
      this.notificationService.notifications();   // track signal
      this.notificationService.unreadCount();     // track signal
      this.cdr.markForCheck();                    // tell OnPush to re-render
    });

  }

  ngOnInit(){
    //connecting on loading the component
    this.notificationService.connect();
  }


  //updating notifications on check
  // ngDoCheck(): void {
  // const newNotifications = this.notificationService.notifications();
  // const newCount = this.notificationService.unreadCount();

  //   if (newCount !== this.unreadCount || newNotifications.length !== this.notifications.length) {
  //     this.notifications = newNotifications;
  //     this.unreadCount = newCount;
  //     this.cdr.markForCheck();
  //   }
  // }

  //disconnect when component is destroyed
  ngOnDestroy():void{
    this.notificationService.disconnect();
  }

  //show notifications
  onNotificationClick(notification: AppNotification):void{
      if(!notification.isRead){
        this.notificationService.markRead(notification.id);
      }

      //navigate to relevant entity view page

      if(notification.referenceType === 'REQUEST'){

        // Navigate to dummy route first, then to actual target (to reload)
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.notificationService.markRead(notification.referenceId);

        this.router.navigate(['/admindivuser/home/requests/view/', notification.referenceId]);
      });

      }else if(notification.referenceType === 'PROCUREMENT'){
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.notificationService.markRead(notification.referenceId);
        this.router.navigate(['/admindivuser/home/procurement/view/', notification.referenceId]);
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

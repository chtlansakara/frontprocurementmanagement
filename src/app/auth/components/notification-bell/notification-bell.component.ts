import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NotifyServiceService } from '../../services/notify-service.service';
import { AngularmaterialModule } from '../../../angularmaterial/angularmaterial.module';

@Component({
  selector: 'app-notification-bell',
  standalone: false,
  templateUrl: './notification-bell.component.html',
  styleUrl: './notification-bell.component.scss'
})
export class NotificationBellComponent implements OnInit, OnDestroy {
   notifyService = inject(NotifyServiceService);
   ngOnInit(): void {
       this.notifyService.connect();
   }
   ngOnDestroy(): void {
       this.notifyService.disconnect();
   }

}

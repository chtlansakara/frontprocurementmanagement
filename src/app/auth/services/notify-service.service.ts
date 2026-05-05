import { AuthService } from './auth.service';
import { computed, inject, Injectable, signal } from '@angular/core';
import { StorageService } from './storage.service';
import { AppNotification } from '../../interfaces/NotificationDto';

@Injectable({
  providedIn: 'root'
})
export class NotifyServiceService {
  // private authService = inject(StorageService);

  private _notifications = signal<AppNotification[]>([]);
  private eventSource :EventSource | null = null;

  //public reactive state
  readonly notifications = this._notifications.asReadonly();
  readonly unreadCount = computed( () =>
    this._notifications().filter( n => !n.isRead).length
  );


  constructor() { }

  connect(): void {
    //if already connected
    if(this.eventSource) return;

    const token = StorageService.getToken();
    //pass JWT as query param manually
    const url = 'api/notifications/stream?token=${token}';

    this.eventSource = new EventSource(url);


    this.eventSource.addEventListener('NOTIFICATION', (event) => {
      const payload = JSON.parse(event.data);
      this._notifications.update(prev => [
        { ...payload, id: crypto.randomUUID(), read: false, createdAt: new Date() },
        ...prev
      ]);
    });

    this.eventSource.addEventListener('error', () => {
      this.reconnect();
    });
  }

  disconnect(): void {
    this.eventSource?.close();
    this.eventSource = null;
  }

  markAsRead(id: number): void {
    this._notifications.update(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  }

  markAllAsRead(): void {
    this._notifications.update(prev => prev.map(n => ({ ...n, read: true })));
  }

  private reconnect(): void {
    this.disconnect();
    setTimeout(() => this.connect(), 3000); // retry after 3s
  }
}



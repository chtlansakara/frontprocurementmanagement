import { ToastService } from './toast.service';
import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal, NgZone } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AppNotification } from '../../interfaces/NotificationDto';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly apiURL = environment.API_URL + environment.URL_NOTIFICATIONS;
  private http = inject(HttpClient);
  private toastService = inject(ToastService);
  private zone = inject(NgZone);
  private abortController: AbortController | null = null;

  notifications = signal<AppNotification[]>([]);
  unreadCount = computed(() => this.notifications().filter(n => !n.isRead).length);

  connect(): void {
    this.disconnect();

    const token = StorageService.getToken();
    if (!token) return;

    this.abortController = new AbortController();

    // fetch is used instead of HttpClient because HttpClient buffers
    // the entire response and doesn't support real-time SSE streaming.
    // We manually add the JWT header here since interceptors don't apply to fetch.
    fetch(`${this.apiURL}/stream`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'text/event-stream',
        'Cache-Control': 'no-cache'
      },
      signal: this.abortController.signal
    }).then(response => {
      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      console.log("connecting for notifications...");

      const read = () => {
        reader.read().then(({ done, value }) => {
          if (done) {
            setTimeout(() => this.connect(), 5000);
            return;
          }

          const chunk = decoder.decode(value, { stream: true });

          // NgZone.run() is critical here — fetch runs outside Angular's
          // zone so signal updates won't trigger change detection without it
          this.zone.run(() => {
            this.parseSSEChunk(chunk);
          });

          read();
        }).catch(err => {
          if (err.name !== 'AbortError') {
            setTimeout(() => this.connect(), 5000);
          }
        });
      };

      read();
    }).catch(err => {
      if (err.name !== 'AbortError') {
        setTimeout(() => this.connect(), 5000);
      }
    });

    this.loadExisting();
  }

  private parseSSEChunk(chunk: string): void {
    const events = chunk.split('\n\n').filter(e => e.trim());

    for (const event of events) {
      const lines = event.split('\n');
      let eventName = '';
      let eventData = '';

      for (const line of lines) {
        if (line.startsWith('event:')) {
          eventName = line.replace('event:', '').trim();
        }
        if (line.startsWith('data:')) {
          eventData = line.replace('data:', '').trim();
        }
      }

      if (eventName === 'notification' && eventData) {
        try {
          const notification: AppNotification = JSON.parse(eventData);
          this.notifications.update(current => [notification, ...current]);
          this.showToast(notification);
        } catch (e) {
          console.error('Failed to parse notification:', e);
        }
      }
    }
  }

  private showToast(notification: AppNotification): void {
    const toastType =
      notification.type.includes('REJECTED') ? 'error' :
      notification.type.includes('APPROVED') ? 'success' :
      notification.type.includes('PROCUREMENT') ? 'info' : 'warning';
    console.log("showing notification toast...");
    this.toastService.show(notification.message, toastType);
  }

  disconnect(): void {
    this.abortController?.abort();
    console.log("notifications disconnected.");
    this.abortController = null;
  }

  private loadExisting(): void {
    // loadExisting uses HttpClient normally — interceptor adds JWT here fine
    // because this is a normal one-shot request, not a stream
    this.http.get<AppNotification[]>(this.apiURL).subscribe({
      next: (notifications) => {
        this.zone.run(() => {
          this.notifications.set(notifications);
        });
      },
      error: (err) => console.error('Failed to load notifications:', err)
    });
  }

  markRead(id: number): void {
    this.http.put(`${this.apiURL}/${id}/read`, {}).subscribe(() => {
      this.notifications.update(current =>
        current.map(n => n.id === id ? { ...n, isRead: true } : n)
      );
    });
  }

  markAllRead(): void {
    this.http.put(`${this.apiURL}/read-all`, {}).subscribe(() => {
      this.notifications.update(current =>
        current.map(n => ({ ...n, isRead: true }))
      );
    });
  }

  constructor() { }
}

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
  private sseBuffer = '';

  notifications = signal<AppNotification[]>([]);
  unreadCount = computed(() => this.notifications().filter(n => !n.isRead).length);

  connect(): void {
    this.disconnect();

    const token = StorageService.getToken();
    if (!token) return;

    this.abortController = new AbortController();
    this.sseBuffer = '';

    fetch(`${this.apiURL}/stream`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'text/event-stream',
        'Cache-Control': 'no-cache'
      },
      signal: this.abortController.signal
    })
    .then(response => {
      if (!response.ok) {
        console.error('❌ SSE connection failed, status:', response.status);
        this.scheduleReconnect();
        return;
      }
      console.log('✅ SSE connection opened, status:', response.status);

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();

      const read = (): void => {
        reader.read().then(({ done, value }) => {

          // Abort was called — stop silently
          if (this.abortController?.signal.aborted) return;

          if (done) {
            console.log('🔴 SSE stream ended, reconnecting...');
            this.scheduleReconnect();
            return;
          }

          this.sseBuffer += decoder.decode(value, { stream: true });
          this.zone.run(() => this.processBuffer());
          read();

        }).catch(err => {
          if (err.name !== 'AbortError') {
            console.error('❌ Reader error:', err);
            this.scheduleReconnect();
          }
        });
      };

      read();
    })
    .catch(err => {
      if (err.name !== 'AbortError') {
        console.error('❌ Fetch error:', err);
        this.scheduleReconnect();
      }
    });

    this.loadExisting();
  }

  private scheduleReconnect(): void {
    if (!this.abortController?.signal.aborted) {
      setTimeout(() => this.connect(), 5000);
    }
  }

  private processBuffer(): void {
    const eventDelimiter = '\n\n';
    let delimiterIndex: number;

    while ((delimiterIndex = this.sseBuffer.indexOf(eventDelimiter)) !== -1) {
      const rawEvent = this.sseBuffer.slice(0, delimiterIndex);
      this.sseBuffer = this.sseBuffer.slice(delimiterIndex + eventDelimiter.length);
      if (rawEvent.trim()) {
        this.parseSSEEvent(rawEvent);
      }
    }
  }

  private parseSSEEvent(rawEvent: string): void {
    const lines = rawEvent.split('\n');
    let eventName = '';
    const dataLines: string[] = [];

    for (const line of lines) {
      if (line.startsWith('event:')) {
        eventName = line.slice('event:'.length).trim();
      } else if (line.startsWith('data:')) {
        dataLines.push(line.slice('data:'.length).trim());
      }
    }

    const eventData = dataLines.join('\n');
    console.log('🧩 SSE event received:', { eventName, eventData });

    if (eventName === 'notification' && eventData) {
      try {
        const notification: AppNotification = JSON.parse(eventData);
        console.log('🔔 Notification parsed:', notification);
        this.notifications.update(current => [notification, ...current]);
        console.log('📊 Signal updated, count:', this.notifications().length);
        this.showToast(notification);
      } catch (e) {
        console.error('Failed to parse notification JSON:', e, 'Raw data:', eventData);
      }
    }
  }

  private showToast(notification: AppNotification): void {
    const toastType =
      notification.type.includes('REJECTED') ? 'error' :
      notification.type.includes('APPROVED') ? 'success' :
      notification.type.includes('PROCUREMENT') ? 'info' : 'warning';
    this.toastService.show(notification.message, toastType);
  }

  disconnect(): void {
    if (this.abortController) {
      const controller = this.abortController;
      this.abortController = null;
      controller.abort();
    }
    console.log('notifications disconnected.');
  }

  private loadExisting(): void {
    this.http.get<AppNotification[]>(this.apiURL).subscribe({
      next: (notifications) => {
        this.zone.run(() => this.notifications.set(notifications));
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




// import { ToastService } from './toast.service';
// import { HttpClient } from '@angular/common/http';
// import { Injectable, computed, inject, signal, NgZone } from '@angular/core';
// import { environment } from '../../../environments/environment';
// import { AppNotification } from '../../interfaces/NotificationDto';
// import { StorageService } from './storage.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class NotificationService {
//   private readonly apiURL = environment.API_URL + environment.URL_NOTIFICATIONS;
//   private http = inject(HttpClient);
//   private toastService = inject(ToastService);
//   private zone = inject(NgZone);
//   private abortController: AbortController | null = null;

//   //buffer to accumulate raw SSE texts
//   private sseBuffer = '';

//   notifications = signal<AppNotification[]>([]);
//   unreadCount = computed(() => this.notifications().filter(n => !n.isRead).length);

//   connect(): void {
//     this.disconnect();

//     const token = StorageService.getToken();
//     if (!token) return;

//     this.abortController = new AbortController();
//     //reset buffer for new connections
//     this.sseBuffer = '';

//     // fetch is used instead of HttpClient because HttpClient buffers
//     // the entire response and doesn't support real-time SSE streaming.
//     // We manually add the JWT header here since interceptors don't apply to fetch.
//     fetch(`${this.apiURL}/stream`, {
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Accept': 'text/event-stream',
//         'Cache-Control': 'no-cache'
//       },
//       signal: this.abortController.signal
//     }).then(response => {
//       console.log('✅ SSE connection opened, status:', response.status);
//       const reader = response.body!.getReader();
//       const decoder = new TextDecoder();

//       console.log("connecting for notifications...");
//       const read = () => {
//         reader.read().then(({ done, value }) => {
//            // Check if we aborted before processing
//         if (this.abortController?.signal.aborted) {
//           console.log('🛑 Stream aborted, stopping read loop');
//           return;
//         }
//           if (done) {
//             console.log('🔴 SSE stream ended, reconnecting...');
//             setTimeout(() => this.connect(), 5000);
//             return;
//           }

//           //append chunk to buffer
//           this.sseBuffer += decoder.decode(value, {stream: true});
//           //only preocesss complete events (terminated by \n\n)
//           this.zone.run(() =>{
//             this.processBuffer();
//           });

//           read();

//           // const chunk = decoder.decode(value, { stream: true });
//           //   console.log('📦 Raw chunk received:', chunk); // ← shows raw SSE text

//           // // NgZone.run() is critical here — fetch runs outside Angular's
//           // // zone so signal updates won't trigger change detection without it

//           // this.zone.run(() => {
//           //     console.log('🔁 Inside NgZone.run()');
//           //   this.parseSSEChunk(chunk);

//           // });

//           // read();
//         }).catch(err => {
//           if (err.name !== 'AbortError') {
//              console.error('❌ Reader error:', err);
//             setTimeout(() => this.connect(), 5000);
//           }
//         });
//       };

//       read();
//     }).catch(err => {
//       if (err.name !== 'AbortError') {
//          console.error('❌ fetch error:', err);
//         setTimeout(() => this.connect(), 5000);
//       }
//     });

//     this.loadExisting();
//   }


//   private processBuffer():void {
//     //sse events are separated by double new lines
//     const eventDelimiter = '\n\n';
//     let delimiterIndex : number;

//     //keep extracting complete events froom the buffer
//     while((delimiterIndex = this.sseBuffer.indexOf(eventDelimiter)) !== -1){
//       const rawEvent = this.sseBuffer.slice(0, delimiterIndex);
//       this.sseBuffer = this.sseBuffer.slice(delimiterIndex + eventDelimiter.length);

//       if(!rawEvent.trim()) continue;

//       this.parseSSEEvent(rawEvent);
//     }
//   }

//   private parseSSEEvent(rawEvent: string):void{
//     const lines = rawEvent.split('\n');
//     let eventName = '';
//     let dataLines : string[] = [];

//     for(const line of lines){
//       if(line.startsWith('event:')){
//         eventName = line.slice('event:'.length).trim();
//       }else if(line.startsWith('data:')){
//         //collect all data
//         dataLines.push(line.slice('data:'.length).trim());
//       }
//     }

//     const eventData = dataLines.join('\n');
//     console.log('🧩 Complete SSE event:', { eventName, eventData });

//     if (eventName === 'notification' && eventData) {
//         try {
//           const notification: AppNotification = JSON.parse(eventData);
//            console.log('🔔 Notification parsed:', notification);
//           this.notifications.update(current => [notification, ...current]);
//            console.log('📊 Signal updated, current count:', this.notifications().length);
//            console.log('trying to show the toast....');
//           this.showToast(notification);
//         } catch (e) {
//           console.error('Failed to parse notification JSON:', e, 'Raw data:', eventData);
//         }
//       }
//   }

//   // private parseSSEChunk(chunk: string): void {
//   //   const events = chunk.split('\n\n').filter(e => e.trim());
//   //   console.log('🧩 Parsed events count:', events.length);

//   //   for (const event of events) {
//   //     const lines = event.split('\n');
//   //     let eventName = '';
//   //     let eventData = '';

//   //     for (const line of lines) {
//   //       if (line.startsWith('event:')) {
//   //         eventName = line.replace('event:', '').trim();
//   //       }
//   //       if (line.startsWith('data:')) {
//   //         eventData = line.replace('data:', '').trim();
//   //       }
//   //     }

//   //     if (eventName === 'notification' && eventData) {
//   //       try {
//   //         const notification: AppNotification = JSON.parse(eventData);
//   //          console.log('🔔 Notification parsed:', notification);
//   //         this.notifications.update(current => [notification, ...current]);
//   //          console.log('📊 Signal updated, current count:', this.notifications().length);
//   //          console.log('trying to show the toast....');
//   //         this.showToast(notification);
//   //       } catch (e) {
//   //         console.error('Failed to parse notification:', e);
//   //       }
//   //     }
//   //   }
//   // }

//   private showToast(notification: AppNotification): void {
//     const toastType =
//       notification.type.includes('REJECTED') ? 'error' :
//       notification.type.includes('APPROVED') ? 'success' :
//       notification.type.includes('PROCUREMENT') ? 'info' : 'warning';
//     console.log("showing notification toast...");
//     this.toastService.show(notification.message, toastType);
//   }

//   disconnect(): void {
//     // this.abortController?.abort();
//     // console.log("notifications disconnected.");
//     // this.abortController = null;
//     if (this.abortController) {
//     const controller = this.abortController;
//     this.abortController = null; // ← null it first
//     controller.abort();          // ← then abort
//   }
//   console.log('notifications disconnected.');
//   }

//   private loadExisting(): void {
//     // loadExisting uses HttpClient normally — interceptor adds JWT here fine
//     // because this is a normal one-shot request, not a stream
//     this.http.get<AppNotification[]>(this.apiURL).subscribe({
//       next: (notifications) => {
//         this.zone.run(() => {
//           this.notifications.set(notifications);
//         });
//       },
//       error: (err) => console.error('Failed to load notifications:', err)
//     });
//   }

//   markRead(id: number): void {
//     this.http.put(`${this.apiURL}/${id}/read`, {}).subscribe(() => {
//       this.notifications.update(current =>
//         current.map(n => n.id === id ? { ...n, isRead: true } : n)
//       );
//     });
//   }

//   markAllRead(): void {
//     this.http.put(`${this.apiURL}/read-all`, {}).subscribe(() => {
//       this.notifications.update(current =>
//         current.map(n => ({ ...n, isRead: true }))
//       );
//     });
//   }

//   constructor() { }
// }

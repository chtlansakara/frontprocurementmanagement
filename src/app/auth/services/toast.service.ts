import { Injectable, signal } from '@angular/core';

//types for Toast
export type ToastType = 'success' |'error' | 'info' | 'warning';

//Interface for Toast
export interface Toast{
  id:number,
  message: string,
  toastType : ToastType
}


@Injectable({
  providedIn: 'root'
})
export class ToastService {
  //toasts list
  toasts = signal<Toast[]>([]);
  private counter = 0;

  constructor() { }

  show(message: string, toastType: ToastType = 'info', duration = 5000): void{
    const id = ++this.counter;
    this.toasts.update(t => [...t, {id, message, toastType}]);
    setTimeout(()=> this.dismiss(id), duration);
  }

  dismiss(id:number):void{
    this.toasts.update(t => t.filter(toast => toast.id !== id));
  }
}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Notification {
  message: string;
  text: string;
  type: 'success' | 'error' | 'warn' | 'info';
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  private notificationSubject = new Subject<Notification>();
  public notifications$ = this.notificationSubject.asObservable();

  show(notification: Notification) {
    this.notificationSubject.next(notification);
    // console.log('NotificationService.show:', notification);
  }
}

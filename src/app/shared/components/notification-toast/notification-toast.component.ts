import { NgClass, NgIf } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-notification-toast',
  imports: [
    NgIf,
    NgClass
  ],
  templateUrl: './notification-toast.component.html',
  styleUrl: './notification-toast.component.css'
})
export class NotificationToastComponent implements OnDestroy{
  message: string = '';
  text: string = '';
  type: 'success' | 'error' | 'warn' | 'info' = 'info';
  visible: boolean = false;
  private sub: Subscription;

  constructor(private notificationService: NotificationService) {
    this.sub = this.notificationService.notifications$.subscribe(({ message, text, type, duration = 3000 }) => {
      // console.log('Toast visible:', this.visible, 'message:', this.message);
      this.message = message;
      this. text = text;
      this.type = type;
      this.visible = true;
      setTimeout(() => (this.visible = false), duration);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}

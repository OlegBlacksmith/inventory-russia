import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderModalService } from '../../../../services/order-modal.service';
import { CommonModule, NgIf } from '@angular/common';
import { Subscription } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';
import { NavigationStart, Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MailService } from '../../../../services/mail.service';
import { NotificationService } from '../../../../services/notification.service';

@Component({
  standalone: true,
  selector: 'app-order-dialog',
  imports: [RouterLink, ReactiveFormsModule, FormsModule, CommonModule, NgIf],
  templateUrl: './order-dialog.component.html',
  styleUrl: './order-dialog.component.css',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('200ms ease-out', style({ opacity: 0 }))]),
    ]),
  ],
})
export class OrderDialogComponent implements OnInit, OnDestroy {
  visible = false;
  form: FormGroup;
  private visibilitySub?: Subscription;
  private routerSub?: Subscription;

  constructor(
    private dialogService: OrderModalService,
    private fb: FormBuilder,
    private mailService: MailService,
    private notificationService: NotificationService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      callTime: ['soon', Validators.required],
      accepted: [false, Validators.requiredTrue],
    });
  }

  ngOnInit() {
    this.visibilitySub = this.dialogService.visibility$.subscribe((value) => {
      this.visible = value;
      document.body.style.overflow = value ? 'hidden' : '';
    });

    this.routerSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.onClose();
      }
    });
  }

  onClose() {
    this.dialogService.hide();
  }

  ngOnDestroy() {
    document.body.style.overflow = '';
    this.visibilitySub?.unsubscribe();
    this.routerSub?.unsubscribe();
  }

  onSubmit() {
    if (this.form.invalid) {
      this.notificationService.show({
        message: 'Пожалуйста, заполните все поля',
        text: 'и подтвердите согласие на обработку данных!',
        type: 'warn',
      });
      console.log('в рот ебал, вызвалось!')
      return;
    }

    const { name, phone, email, callTime } = this.form.value;

    const callTimeMap: Record<string, string> = {
      soon: 'в ближайшее время',
      duringTheDay: 'в течение дня',
      onlyPost: 'предпочитает почту',
    };
    const callTimeLabel = callTimeMap[callTime] || callTime;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append(
      'message',
      `Телефон: ${phone}\nПочта: ${email}\nКогда перезвонить: ${callTimeLabel}`
    );

    this.mailService.sendEmailReg(formData).subscribe({
      next: () => {
        this.notificationService.show({
          message: 'Заявка отправлена!',
          text: 'Ждите звонка',
          type: 'success',
        });
        this.form.reset();
        this.onClose();
      },
      error: () => {
        this.notificationService.show({
          message: 'Ошибка отправки!',
          text: 'Попробуйте снова',
          type: 'error',
        });
      },
    });
  }
}

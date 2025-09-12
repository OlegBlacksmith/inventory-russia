import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonModule, NgIf } from '@angular/common';
import { CareerModalService } from '../../../../services/career-modal.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { NavigationStart, Router, RouterLink } from '@angular/router';
import { MailService } from '../../../../services/mail.service';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../../../services/notification.service';

@Component({
  selector: 'app-career-dialog',
  imports: [RouterLink, FormsModule, CommonModule, NgIf],
  templateUrl: './career-dialog.component.html',
  styleUrl: './career-dialog.component.css',
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
export class CareerDialogComponent {
  visible: boolean = false;
  name: string = '';
  phone: string = '';
  email: string = '';
  callTime: string = 'soon';
  accepted: boolean = false;
  selectedFile: File | null = null;
  readonly MAX_FILE_SIZE = 5 * 1024 * 1024;
  private routerSub?: Subscription;

  private visibilitySub?: Subscription;

  constructor(
    private dialogService: CareerModalService,
    private notificationService: NotificationService,
    private mailService: MailService,
    private router: Router,
  ) {}

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

  ngOnDestroy() {
    document.body.style.overflow = '';
    this.visibilitySub?.unsubscribe();
    this.routerSub?.unsubscribe();
  }

  onClose() {
    this.dialogService.hide();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      if (file.size > this.MAX_FILE_SIZE) {
        this.notificationService.show({
          message: 'Файл слишком большой!',
          text: 'Максимальный размер файла 5 МБ',
          type: 'warn',
        });
        this.selectedFile = null;
        // При необходимости сбросьте input
        input.value = '';
        return;
      }
      this.selectedFile = file;
    }
  }

  submit() {
    if (!this.name || !this.phone || !this.email) {
      this.notificationService.show({
        message: 'Заполните все поля!',
        text: '',
        type: 'warn',
      });
      return;
    }

    if (!this.accepted) {
      this.notificationService.show({
        message: 'Подтвердите согласие',
        text: 'на обработку перс данных',
        type: 'warn',
      });
      return;
    }

    if (!this.selectedFile) {
      this.notificationService.show({
        message: 'Пожалуйста, прикрепите файл!',
        text: '',
        type: 'warn',
      });
      return;
    }

    if (this.selectedFile.size > this.MAX_FILE_SIZE) {
      this.notificationService.show({
        message: 'Файл слишком большой!',
        text: 'Максимальный размер файла 5 МБ',
        type: 'warn',
      });
      return;
    }

    const callTimeMap: Record<string, string> = {
      soon: 'в ближайшее время',
      duringTheDay: 'в течение дня',
      onlyPost: 'предпочитает почту',
    };
    const callTimeLabel = callTimeMap[this.callTime] || this.callTime;

    const formData = new FormData();
    formData.append('name', this.name);
    formData.append('email', this.email);
    formData.append(
      'message',
      `Телефон: ${this.phone}\nПочта: ${this.email}\nКогда перезвонить: ${callTimeLabel}`
    );
    formData.append('attachment', this.selectedFile);

    this.mailService.sendEmailWFile(formData).subscribe({
      next: () => {
        this.notificationService.show({
          message: 'Заявка отправлена!',
          text: 'Ожидайте звонка',
          type: 'success',
        });
        this.name = '';
        this.phone = '';
        this.email = '';
        this.callTime = 'soon';
        this.accepted = false;
        this.selectedFile = null;
        this.onClose();
      },
      error: () =>
        this.notificationService.show({
          message: 'Ошибка отправки!',
          text: 'Попробуйте снова',
          type: 'error',
        }),
    });
  }
}

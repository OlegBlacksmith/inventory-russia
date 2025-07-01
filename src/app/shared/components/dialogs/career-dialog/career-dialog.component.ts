import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonModule, NgIf } from '@angular/common';
import { CareerModalService } from '../../../../services/career-modal.service';
import {
  trigger,
  transition,
  style,
  animate,
} from '@angular/animations';
import { RouterLink } from '@angular/router';
import { MailService } from '../../../../services/mail.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-career-dialog',
  imports: [
    RouterLink,
    FormsModule,
    CommonModule,
    NgIf
  ],
  templateUrl: './career-dialog.component.html',
  styleUrl: './career-dialog.component.css',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('200ms ease-out', style({ opacity: 0 })),
      ]),
    ])
  ]
})
export class CareerDialogComponent {
  visible: boolean = false;
  name = '';
  phone = '';
  email = '';
  callTime = 'soon';
  accepted = false;
  selectedFile: File | null = null;

  private visibilitySub?: Subscription;

  constructor(private dialogService: CareerModalService, private mailService: MailService) {}

  ngOnInit() {
    this.visibilitySub = this.dialogService.visibility$.subscribe(value => {
      this.visible = value;
      document.body.style.overflow = value ? 'hidden' : '';
    });
  }

  ngOnDestroy() {
    document.body.style.overflow = '';
    this.visibilitySub?.unsubscribe();
  }

  onClose() {
    this.dialogService.hide();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  submit() {
    if (!this.name || !this.phone || !this.email || !this.accepted) {
      alert('Пожалуйста, заполните все поля и подтвердите согласие.');
      return;
    }

    const formData = new FormData();
    formData.append('name', this.name);
    formData.append('email', this.email);
    formData.append('message', `Телефон: ${this.phone}\nПозвонить: ${this.callTime}\nПочта: ${this.email}`);
    if (this.selectedFile) {
      formData.append('attachment', this.selectedFile);
    }

    this.mailService.sendEmailWFile(formData).subscribe({
      next: () => {
        alert('Заявка отправлена!');
        this.name = '';
        this.phone = '';
        this.email = '';
        this.callTime = 'soon';
        this.accepted = false;
        this.selectedFile = null;
        this.onClose();
      },
      error: () => alert('Ошибка при отправке')
    });
  }
}

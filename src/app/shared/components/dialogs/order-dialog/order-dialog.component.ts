import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderModalService } from '../../../../services/order-modal.service';
import { CommonModule, NgIf } from '@angular/common';
import { Subscription } from 'rxjs';
import {
  trigger,
  transition,
  style,
  animate,
} from '@angular/animations';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MailService } from '../../../../services/mail.service';


@Component({
  standalone: true,
  selector: 'app-order-dialog',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    NgIf
  ],
  templateUrl: './order-dialog.component.html',
  styleUrl: './order-dialog.component.css',
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
export class OrderDialogComponent implements OnInit, OnDestroy {
  visible = false;
  form: FormGroup;
  private visibilitySub?: Subscription;

  constructor(
    private dialogService: OrderModalService,
    private fb: FormBuilder,
    private mailService: MailService
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
  }

  onClose() {
    this.dialogService.hide();
  }

  ngOnDestroy() {
    document.body.style.overflow = '';
    this.visibilitySub?.unsubscribe();
  }

  onSubmit() {
    if (this.form.invalid) {
      alert('Пожалуйста, заполните все поля и подтвердите согласие.');
      return;
    }

    const { name, phone, email, callTime } = this.form.value;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('message', `Телефон: ${phone}\nКогда перезвонить: ${callTime}`);

    this.mailService.sendEmailReg(formData).subscribe({
      next: () => {
        alert('Заявка успешно отправлена!');
        this.form.reset();
        this.onClose();
      },
      error: () => alert('Ошибка при отправке заявки. Попробуйте позже.'),
    });
  }
}

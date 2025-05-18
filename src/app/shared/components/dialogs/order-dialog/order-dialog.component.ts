import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderModalService } from '../../../../services/order-modal.service';
import { NgIf } from '@angular/common';
import { Subscription } from 'rxjs';
import {
  trigger,
  transition,
  style,
  animate,
} from '@angular/animations';
import { RouterLink } from '@angular/router';


@Component({
  standalone: true,
  selector: 'app-order-dialog',
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './order-dialog.component.html',
  styleUrl: './order-dialog.component.scss',
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
  visible: boolean = false;
  selectedOption: string | null = null;

  private visibilitySub?: Subscription;

  constructor(private dialogService: OrderModalService) {}

  ngOnInit() {
    this.visibilitySub = this.dialogService.visibility$.subscribe(value => {
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
}

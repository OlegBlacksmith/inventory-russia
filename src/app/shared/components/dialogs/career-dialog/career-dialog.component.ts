import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgIf } from '@angular/common';
import { CareerModalService } from '../../../../services/career-modal.service';
import {
  trigger,
  transition,
  style,
  animate,
} from '@angular/animations';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-career-dialog',
  imports: [
    RouterLink,
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
  selectedOption: string | null = null;

  private visibilitySub?: Subscription;

  constructor(private dialogService: CareerModalService) {}

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

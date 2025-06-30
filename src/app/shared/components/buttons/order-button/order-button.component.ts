import { Component, Input } from '@angular/core';
import { OrderModalService } from '../../../../services/order-modal.service';

@Component({
  selector: 'app-order-button',
  imports: [],
  templateUrl: './order-button.component.html',
  styleUrl: './order-button.component.css'
})
export class OrderButtonComponent {
  @Input() buttonText?: string;

  @Input() opensDialog: boolean = false;

  constructor(private dialogService: OrderModalService){}

  isShowOrderDialog: boolean = false;

  onClick() {
    if (this.opensDialog) {
      this.dialogService.show();
    }
  }
}

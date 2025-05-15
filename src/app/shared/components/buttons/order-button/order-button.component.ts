import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-order-button',
  imports: [],
  templateUrl: './order-button.component.html',
  styleUrl: './order-button.component.scss'
})
export class OrderButtonComponent {
  @Input() buttonText?: string;
  @Input() fontSize?: number;
  @Input() fontWeight?: number;
  @Input() borderRadius?: number;
  @Input() padding?: string;
}

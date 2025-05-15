import { Component } from '@angular/core';
import { OrderButtonComponent } from '../../../../shared/components/buttons/order-button/order-button.component';

@Component({
  selector: 'app-greet',
  imports: [
    OrderButtonComponent
  ],
  templateUrl: './greet-section.component.html',
  styleUrl: './greet-section.component.scss'
})
export class GreetSectionComponent {
  textButton = "Оставить заявку"
}

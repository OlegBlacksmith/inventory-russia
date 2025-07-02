import { Component, inject } from '@angular/core';
import { OrderButtonComponent } from '../../../../shared/components/buttons/order-button/order-button.component';
import { ScreenService } from '../../../../services/screen.service';
import { map } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-greet',
  imports: [
    OrderButtonComponent,
    // NgIf,
    // AsyncPipe
  ],
  templateUrl: './greet-section.component.html',
  styleUrl: './greet-section.component.css'
})
export class GreetSectionComponent {

}

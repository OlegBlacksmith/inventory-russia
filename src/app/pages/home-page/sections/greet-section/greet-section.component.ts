import { Component, inject, Input } from '@angular/core';
import { OrderButtonComponent } from '../../../../shared/components/buttons/order-button/order-button.component';
import { NgIf } from '@angular/common';
import { LogoInfo } from '../../../../shared/models/logo-info.model';

@Component({
  selector: 'app-greet',
  imports: [
    OrderButtonComponent,
    NgIf,
    // AsyncPipe
  ],
  templateUrl: './greet-section.component.html',
  styleUrl: './greet-section.component.css'
})
export class GreetSectionComponent {
  @Input() mainLogo: LogoInfo | undefined;
}

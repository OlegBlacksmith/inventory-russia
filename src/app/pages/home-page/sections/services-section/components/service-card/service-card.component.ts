import { Component } from '@angular/core';
import { NgClass, NgFor } from '@angular/common';
import { AdditionalButtonComponent } from '../additional-button/additional-button.component';
import { cardsContent } from '../../../../../../shared/data/service-cards-contant';


@Component({
  standalone: true,
  selector: 'app-service-card',
  imports: [
    NgFor,
    NgClass,
    AdditionalButtonComponent
  ],
  templateUrl: './service-card.component.html',
  styleUrl: './service-card.component.scss'
})
export class ServiceCardComponent {
  cardsContent = cardsContent;
}

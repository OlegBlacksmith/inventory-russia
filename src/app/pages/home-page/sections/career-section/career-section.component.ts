import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../../components/page-header/page-header.component';
import { OrderButtonComponent } from '../../../../shared/components/buttons/order-button/order-button.component';

@Component({
  selector: 'app-career',
  imports: [
    PageHeaderComponent,
    OrderButtonComponent
  ],
  templateUrl: './career-section.component.html',
  styleUrl: './career-section.component.scss'
})
export class CareerSectionComponent {

}

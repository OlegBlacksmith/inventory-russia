import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../../components/page-header/page-header.component';
import { OrderButtonComponent } from '../../../../shared/components/buttons/order-button/order-button.component';

@Component({
  selector: 'app-contacts',
  imports: [
    PageHeaderComponent,
    OrderButtonComponent
  ],
  templateUrl: './contacts-section.component.html',
  styleUrl: './contacts-section.component.scss'
})
export class ContactsSectionComponent {

}

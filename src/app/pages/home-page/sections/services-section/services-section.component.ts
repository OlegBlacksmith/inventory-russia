import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { ServiceCardComponent } from './components/service-card/service-card.component';

@Component({
  selector: 'app-services',
  imports: [
    PageHeaderComponent,
    ServiceCardComponent
  ],
  templateUrl: './services-section.component.html',
  styleUrl: './services-section.component.scss'
})
export class ServicesSectionComponent {

}

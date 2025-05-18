import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { CarouselComponent } from './components/carousel/carousel.component';

@Component({
  selector: 'app-clients',
  imports: [
    PageHeaderComponent,
    CarouselComponent
  ],
  templateUrl: './clients-section.component.html',
  styleUrl: './clients-section.component.scss'
})
export class ClientsSectionComponent {

}

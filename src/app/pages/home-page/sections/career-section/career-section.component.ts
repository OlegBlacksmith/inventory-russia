import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { CareerButtonComponent } from './components/career-button/career-button.component';

@Component({
  selector: 'app-career',
  imports: [
    PageHeaderComponent,
    CareerButtonComponent
  ],
  templateUrl: './career-section.component.html',
  styleUrl: './career-section.component.scss'
})
export class CareerSectionComponent {

}

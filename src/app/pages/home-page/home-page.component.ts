import { Component } from '@angular/core';
import { GreetSectionComponent } from './sections/greet-section/greet.component';
import { ServicesSectionComponent } from './sections/services-section/services-section.component';
import { ClientsSectionComponent } from './sections/client-section/clients-section.component';
import { CareerSectionComponent } from './sections/career-section/career-section.component';
import { ContactsSectionComponent } from './sections/contacts-section/contacts-section.component';

@Component({
  selector: 'app-home-page',
  imports: [
    GreetSectionComponent,
    ServicesSectionComponent,
    ClientsSectionComponent,
    CareerSectionComponent,
    ContactsSectionComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

}

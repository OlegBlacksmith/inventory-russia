import { Component, OnInit } from '@angular/core';
import { GreetSectionComponent } from './sections/greet-section/greet-section.component';
import { ServicesSectionComponent } from './sections/services-section/services-section.component';
import { ClientsSectionComponent } from './sections/client-section/clients-section.component';
import { CareerSectionComponent } from './sections/career-section/career-section.component';
import { ContactsSectionComponent } from './sections/contacts-section/contacts-section.component';
import CompanyInfo from '../../shared/models/company-info.model';
import { CompanyInfoService } from '../../services/company-info.service';
import Details from '../../shared/models/details.model';
import { LogoService } from '../../services/logo.service';
import { LogoInfo } from '../../shared/models/logo-info.model';

@Component({
  selector: 'app-home-page',
  imports: [
    GreetSectionComponent,
    ServicesSectionComponent,
    ClientsSectionComponent,
    CareerSectionComponent,
    ContactsSectionComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
  public companyInfo: CompanyInfo | undefined;
  public mainLogo: LogoInfo | undefined;
  public details: Details | undefined;

  constructor(
    private infoService: CompanyInfoService,
    private logoService: LogoService
  ) {}

  async ngOnInit() {
    this.loadData();
  }

  async loadData() {
    try {
      const info = await this.infoService.getCompanyInfo();
      if (info) this.companyInfo = info;
      else console.warn('Failed to load company information');
    } catch (error) {
      console.error('Error fetching company info:', error);
    }

    try {
      const details = await this.infoService.getDetails();
      if (details) this.details = details;
      else console.warn('Failed to load details');
    } catch (error) {
      console.error('Error fetching details:', error);
    }

    try {
      this.mainLogo = await this.logoService.getLogoByType('main');
    } catch (error) {
      console.error('Failed to load main logo:', error);
    }
  }
}

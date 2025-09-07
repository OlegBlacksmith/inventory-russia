import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { OrderDialogComponent } from '../../../shared/components/dialogs/order-dialog/order-dialog.component';
import { CareerDialogComponent } from '../../../shared/components/dialogs/career-dialog/career-dialog.component';
import { CoockieBubbleComponent } from '../../../shared/components/coockie-bubble/coockie-bubble.component';
import { FabMenuComponent } from '../../../shared/components/fab-menu/fab-menu.component';
import { LogoService } from '../../../services/logo.service';
import { LogoInfo } from '../../../shared/models/logo-info.model';
import CompanyInfo from '../../../shared/models/company-info.model';
import { CompanyInfoService } from '../../../services/company-info.service';
import { NotificationToastComponent } from '../../../shared/components/notification-toast/notification-toast.component';

@Component({
  selector: 'app-public-layout',
  imports: [
    RouterOutlet,
    HeaderComponent,
    OrderDialogComponent,
    CareerDialogComponent,
    CoockieBubbleComponent,
    NotificationToastComponent,
    FabMenuComponent,
    FooterComponent
  ],
  templateUrl: './public-layout.component.html',
  styleUrl: './public-layout.component.css'
})
export class PublicLayoutComponent implements OnInit{
  public headerLogo: LogoInfo | undefined;
  public footerLogo: LogoInfo | undefined;
  public companyInfo: CompanyInfo | undefined;

  constructor(private logoService: LogoService, private companyInfoService: CompanyInfoService) {}

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    try {
      this.headerLogo = await this.logoService.getLogoByType('header');
      this.footerLogo = await this.logoService.getLogoByType('footer');
    } catch (error) {
      console.warn('Failed to load main logo', error);
    }

    try{
      this.companyInfo = await this.companyInfoService.getCompanyInfo();
    } catch(error){
      console.warn('Failed to load company info', error)
    }
  }
}

import { Component, inject, Input, OnInit } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { combineLatest, map, Observable } from 'rxjs';
import { ScreenService } from '../../../services/screen.service';
import { MobileMenuComponent } from "../mobile-menu/mobile-menu.component";
import { RouterLink } from '@angular/router';
import { MobileMenuService } from '../../../services/mobile-menu.service';
import { LogoInfo } from '../../models/logo-info.model';
import CompanyInfo from '../../models/company-info.model';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [
    NgIf,
    AsyncPipe,
    MobileMenuComponent,
    RouterLink
],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() headerLogo: LogoInfo | undefined;
  @Input() companyInfo: CompanyInfo | undefined;

  private menuService = inject(MobileMenuService);
  private screenService = inject(ScreenService);

  constructor() {}

  toggleMenu() {
    this.menuService.toggle();
  }

  closeMenu = () => {
    this.menuService.close();
  };

  isMobile$ = this.screenService.isMobile$;
  isTablet$ = this.screenService.isTablet$;
  isMenuOpen$ = this.menuService.isOpen$;

  readonly showNavMenu$ = combineLatest([
    this.screenService.isMobile$,
    this.screenService.isTablet$
  ]).pipe(
      map(([isMobile, isTablet]) => !(isMobile || isTablet))
  );

  formatPhoneNumber(phone?: string): string {
    if (!phone) {
      return '';
    }
    return phone.replace(/[^\d+]/g, '');
  }
}

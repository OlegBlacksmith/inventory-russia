import { Component, inject } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { combineLatest, map, Observable } from 'rxjs';
import { ScreenService } from '../../../services/screen.service';
import { MobileMenuComponent } from "../mobile-menu/mobile-menu.component";
import { RouterLink } from '@angular/router';
import { MobileMenuService } from '../../../services/mobile-menu.service';

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
  private menuService = inject(MobileMenuService);
  private screenService = inject(ScreenService);

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


}

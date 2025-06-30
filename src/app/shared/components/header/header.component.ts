import { Component, inject } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { map, Observable } from 'rxjs';
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
  isNotMobile$ = this.screenService.isNotMobile$;
  isMenuOpen$ = this.menuService.isOpen$;

  readonly showNavMenu$ = this.screenService.isMobile$.pipe(
    map(isMobile => !isMobile)
  );
}

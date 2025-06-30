import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ScreenService } from '../../../services/screen.service';
import { fromEvent } from 'rxjs';
import { MobileMenuService } from '../../../services/mobile-menu.service';

@Component({
  standalone: true,
  selector: 'app-fab-menu',
  imports: [
    NgIf,
    AsyncPipe
  ],
  templateUrl: './fab-menu.component.html',
  styleUrl: './fab-menu.component.css'
})
export class FabMenuComponent {
   private menuService = inject(MobileMenuService);
  private screenService = inject(ScreenService);

  isOpen$ = this.menuService.isOpen$;
  isMobile$ = this.screenService.isMobile$;

  isHeaderHidden = signal(false);

  constructor() {
    fromEvent(window, 'scroll').subscribe(() => {
      const header = document.getElementById('app-header');
      if (header) {
        const rect = header.getBoundingClientRect();
        this.isHeaderHidden.set(rect.bottom < 0);
      }
    });
  }

  toggleMenu() {
    this.menuService.toggle();
  }
}

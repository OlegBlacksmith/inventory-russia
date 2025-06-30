import { Component, inject, Input } from '@angular/core';
import { MobileMenuService } from '../../../services/mobile-menu.service';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-mobile-menu',
  imports: [
    AsyncPipe
  ],
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.css'
})
export class MobileMenuComponent {
  protected menuService = inject(MobileMenuService);
  isOpen$ = this.menuService.isOpen$;

  closeMenu() {
    this.menuService.close();
  }
}

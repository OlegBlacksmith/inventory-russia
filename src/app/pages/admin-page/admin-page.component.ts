import { Component } from '@angular/core';
import { FileExplorerComponent } from './components/file-explorer-directory/file-explorer/file-explorer.component';
import { PartnersControlComponent } from './components/partners-directory/partners-control/partners-control.component';
import { LogViewComponent } from './components/log-view/log-view.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { GratControlComponent } from './components/gratitudes-directory/grat-control/grat-control.component';
import { MailConfigRedactorComponent } from './components/mails-directory/mail-config-redactor/mail-config-redactor.component';
import { LogoControlComponent } from './components/logo-directory/logo-control/logo-control.component';

@Component({
  selector: 'app-admin-page',
  imports: [
    FileExplorerComponent,
    PartnersControlComponent,
    GratControlComponent,
    MailConfigRedactorComponent,
    LogViewComponent,
    LogoControlComponent
  ],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.logout(); // удаляет токен
    this.router.navigate(['/login']); // редирект на страницу входа
  }
}

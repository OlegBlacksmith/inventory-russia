import { Component, Input } from '@angular/core';
import { LogoInfo } from '../../models/logo-info.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [
    RouterLink
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  @Input() footerLogo: LogoInfo | undefined;
}

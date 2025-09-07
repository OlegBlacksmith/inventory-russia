import { Component, Input } from '@angular/core';
import { LogoInfo } from '../../models/logo-info.model';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  @Input() footerLogo: LogoInfo | undefined;
}

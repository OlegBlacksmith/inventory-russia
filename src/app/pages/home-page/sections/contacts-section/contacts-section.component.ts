import { Component, inject, Input } from '@angular/core';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { OrderButtonComponent } from '../../../../shared/components/buttons/order-button/order-button.component';
import { ScreenService } from '../../../../services/screen.service';
import { combineLatest, map } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import CompanyInfo from '../../../../shared/models/company-info.model';
import Details from '../../../../shared/models/details.model';

@Component({
  selector: 'app-contacts',
  imports: [
    PageHeaderComponent,
    OrderButtonComponent,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './contacts-section.component.html',
  styleUrl: './contacts-section.component.css'
})
export class ContactsSectionComponent {
  @Input() public companyInfo: CompanyInfo | undefined;
  @Input() public details: Details | undefined;

  private screenService = inject(ScreenService);

  isMobile$ = this.screenService.isMobile$;
  isTablet$ = this.screenService.isTablet$;

  readonly showIsland$ = combineLatest([
    this.screenService.isMobile$,
    this.screenService.isTablet$
  ]).pipe(
    map(([isMobile, isTablet]) => !(isMobile || isTablet))
  );
}

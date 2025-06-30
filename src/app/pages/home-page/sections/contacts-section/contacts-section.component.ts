import { Component, inject } from '@angular/core';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { OrderButtonComponent } from '../../../../shared/components/buttons/order-button/order-button.component';
import { ScreenService } from '../../../../services/screen.service';
import { map } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';

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
  private screenService = inject(ScreenService);

  isMobile$ = this.screenService.isMobile$;
  isNotMobile$ = this.screenService.isNotMobile$;

  readonly showIsland$ = this.screenService.isMobile$.pipe(
    map(isMobile => !isMobile)
  );
}

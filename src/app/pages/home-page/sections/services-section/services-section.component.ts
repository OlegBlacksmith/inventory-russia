import { Component, inject } from '@angular/core';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { ServiceCardComponent } from './components/service-card/service-card.component';
import { ScreenService } from '../../../../services/screen.service';
import { combineLatest, map } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-services',
  imports: [
    PageHeaderComponent,
    ServiceCardComponent,
    AsyncPipe,
    NgIf
  ],
  templateUrl: './services-section.component.html',
  styleUrl: './services-section.component.css'
})
export class ServicesSectionComponent {
  private screenService = inject(ScreenService);

  isMobile$ = this.screenService.isMobile$;
  isNotMobile$ = this.screenService.isTablet$;

  readonly showIsland$ = combineLatest([
    this.screenService.isMobile$,
    this.screenService.isTablet$
  ]).pipe(
    map(([isMobile, isTablet]) => !(isMobile || isTablet))
  );
}

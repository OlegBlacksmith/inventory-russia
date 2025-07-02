import { Component, inject } from '@angular/core';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ScreenService } from '../../../../services/screen.service';
import { combineLatest, map } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { GratitudeCarouselComponent } from './components/gratitude-carousel/gratitude-carousel.component';

@Component({
  selector: 'app-clients',
  imports: [
    PageHeaderComponent,
    CarouselComponent,
    GratitudeCarouselComponent,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './clients-section.component.html',
  styleUrl: './clients-section.component.css'
})
export class ClientsSectionComponent {
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

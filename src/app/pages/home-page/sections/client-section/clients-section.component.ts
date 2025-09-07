import { Component, inject, OnInit } from '@angular/core';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ScreenService } from '../../../../services/screen.service';
import { combineLatest, map } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { GratitudeCarouselComponent } from './components/gratitude-carousel/gratitude-carousel.component';
import { PartnersService } from '../../../../services/partners.service';
import { GratitudesService } from '../../../../services/gratitudes.service';

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
export class ClientsSectionComponent implements OnInit{
  partners: string[] = [];
  gratitude: string[] = [];
  private screenService = inject(ScreenService);

  constructor(private partService: PartnersService, private gratService: GratitudesService){}

  async ngOnInit() {
    try {
      this.partners = await this.partService.getPartnerPicsList();
      this.gratitude = await this.gratService.getGratitudesList();
    } catch (err) {
      console.error(err);
      this.partners = [];
      this.gratitude = [];
    }
  }

  isMobile$ = this.screenService.isMobile$;
  isTablet$ = this.screenService.isTablet$;

  readonly showIsland$ = combineLatest([
    this.screenService.isMobile$,
    this.screenService.isTablet$
  ]).pipe(
    map(([isMobile, isTablet]) => !(isMobile || isTablet))
  );
}

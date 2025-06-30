import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ScreenService } from '../../../../../../services/screen.service';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-gratitude-carousel',
  imports: [
    CarouselModule
  ],
  templateUrl: './gratitude-carousel.component.html',
  styleUrl: './gratitude-carousel.component.css'
})
export class GratitudeCarouselComponent implements OnInit, OnDestroy{
  numVisible = 5;

  images: string[] = [
    '/assets/pictures/gratitudes/grat1.webp',
    '/assets/pictures/gratitudes/grat2.webp',
    '/assets/pictures/gratitudes/grat3.webp',
    '/assets/pictures/gratitudes/grat3.webp'
  ];

  private destroy$ = new Subject<void>();
  private screenService = inject(ScreenService);

  ngOnInit() {
    this.screenService.isMobile$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isMobile) => {
        this.numVisible = isMobile ? 3 : 3;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

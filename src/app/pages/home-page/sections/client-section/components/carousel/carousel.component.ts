import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ScreenService } from '../../../../../../services/screen.service';
import { map, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-carousel',
  imports: [
    CarouselModule
  ],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent implements OnInit, OnDestroy {
  numVisible = 5;

  images: string[] = [
    '/assets/pictures/partners/bask.svg',
    '/assets/pictures/partners/berges.svg',
    '/assets/pictures/partners/castorama.svg',
    '/assets/pictures/partners/dbschenker.svg',
    '/assets/pictures/partners/dunlop.svg',
    '/assets/pictures/partners/evroset.svg',
    '/assets/pictures/partners/fashion_hub.svg',
  ];

  private destroy$ = new Subject<void>();
  private screenService = inject(ScreenService);

  ngOnInit() {
    this.screenService.isMobile$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isMobile) => {
        this.numVisible = isMobile ? 3 : 5;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

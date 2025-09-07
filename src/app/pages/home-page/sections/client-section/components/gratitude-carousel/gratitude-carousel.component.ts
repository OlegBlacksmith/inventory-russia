import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
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
  @Input() gratitude: string[] = [];
  numVisible = 5;

  private destroy$ = new Subject<void>();
  private screenService = inject(ScreenService);

  ngOnInit() {
    this.screenService.isMobile$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isMobile) => {
        this.numVisible = isMobile ? 3 : 3;
      });
  }

  openInNewTab(url: string): void {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

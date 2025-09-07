import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ScreenService } from '../../../../../../services/screen.service';
import { combineLatest, map, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-carousel',
  imports: [
    CarouselModule
  ],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent implements OnInit, OnDestroy {
  @Input() partners: string[] = [];
  numVisible = 5;

  private destroy$ = new Subject<void>();
  private screenService = inject(ScreenService);

  ngOnInit() {
    combineLatest([
      this.screenService.isMobile$,
      this.screenService.isTablet$
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([isMobile, isTablet]) => {
        if (isMobile) {
          this.numVisible = 3;
        } else if (isTablet) {
          this.numVisible = 5;
        } else {
          this.numVisible = 5;
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

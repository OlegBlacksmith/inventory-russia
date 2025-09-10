import {Component, inject, Input, OnDestroy, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ScreenService } from '../../../../../../services/screen.service';
import { combineLatest, Subject, takeUntil } from 'rxjs';
import { OrderModalService } from '../../../../../../services/order-modal.service';

@Component({
  selector: 'app-carousel',
  imports: [
    CarouselModule
  ],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent implements OnInit, OnDestroy, OnChanges {
  @Input() partners: string[] = [];
  renderedPartners: string[] = [];
  numVisible = 5;

  constructor(private orderModalService: OrderModalService){};

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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['partners'] && changes['partners'].currentValue) {
      const modifiedPartners = [...this.partners];
      for (let i = 2; i < modifiedPartners.length; i += 3) {
        modifiedPartners.splice(i, 0, '');
      }
      this.renderedPartners = modifiedPartners;
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  callOrderModal(): void{
    this.orderModalService.show();
  }
}

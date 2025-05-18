import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-carousel',
  imports: [
    CarouselModule
  ],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent {
  images: string[] = [
    '/assets/pictures/partners/bask.svg',
    '/assets/pictures/partners/berges.svg',
    '/assets/pictures/partners/castorama.svg',
    '/assets/pictures/partners/dbschenker.svg',
    '/assets/pictures/partners/dunlop.svg',
    '/assets/pictures/partners/evroset.svg',
    '/assets/pictures/partners/fashion_hub.svg',
  ];

  // responsiveOptions = [
  //   {
  //     breakpoint: '1024px',
  //     numVisible: 5,
  //     numScroll: 1
  //   },
  //   {
  //     breakpoint: '768px',
  //     numVisible: 2,
  //     numScroll: 1
  //   },
  //   {
  //     breakpoint: '560px',
  //     numVisible: 1,
  //     numScroll: 1
  //   }
  // ];
}

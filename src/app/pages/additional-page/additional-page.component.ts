import { Component } from '@angular/core';
import { BackButtonComponent } from '../../shared/components/buttons/back-button/back-button.component';
import { OrderButtonComponent } from '../../shared/components/buttons/order-button/order-button.component';
import { ActivatedRoute } from '@angular/router';
import { ADDITIONAL_DETAILS } from '../../shared/data/additional-details-content';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-additional-page',
  imports: [
    BackButtonComponent,
    OrderButtonComponent,
    NgIf,
    NgFor
  ],
  templateUrl: './additional-page.component.html',
  styleUrl: './additional-page.component.scss'
})
export class AdditionalPageComponent {
  type: string | null = null;
  content: { title: string; items: string[]; icon: string } | null = null;

  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.type = params.get('type');
      this.loadContentBasedOnType();
    });
  }

  loadContentBasedOnType() {
    if (this.type && ADDITIONAL_DETAILS[this.type]) {
      this.content = ADDITIONAL_DETAILS[this.type];
    } else {
      this.content = null;
    }
  }
}

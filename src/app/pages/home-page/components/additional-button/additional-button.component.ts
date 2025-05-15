import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-additional-button',
  imports: [],
  templateUrl: './additional-button.component.html',
  styleUrl: './additional-button.component.scss'
})
export class AdditionalButtonComponent {
  @Input() target!: string;

  constructor(private router: Router) {}

  goToTargetPage() {
    this.router.navigate(['/additional', this.target]);
  }
}

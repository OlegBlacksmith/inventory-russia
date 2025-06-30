import { Component, Input } from '@angular/core';
import { CareerModalService } from '../../../../../../services/career-modal.service';

@Component({
  selector: 'app-career-button',
  imports: [],
  templateUrl: './career-button.component.html',
  styleUrl: './career-button.component.css'
})
export class CareerButtonComponent {
  @Input() opensDialog: boolean = false;

  constructor(private dialogService: CareerModalService){}

    isShowOrderDialog: boolean = false;

    onClick() {
      if (this.opensDialog) {
        this.dialogService.show();
      }
    }
}

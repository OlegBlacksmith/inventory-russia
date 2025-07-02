import { Component, inject } from '@angular/core';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { CareerButtonComponent } from './components/career-button/career-button.component';
import { ScreenService } from '../../../../services/screen.service';
import { map } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-career',
  imports: [
    PageHeaderComponent,
    CareerButtonComponent,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './career-section.component.html',
  styleUrl: './career-section.component.css'
})
export class CareerSectionComponent {
  private screenService = inject(ScreenService);

  isMobile$ = this.screenService.isMobile$;
  isNotMobile$ = this.screenService.isTablet$;

  readonly showIsland$ = this.screenService.isMobile$.pipe(
    map(isMobile => !isMobile)
  );
}

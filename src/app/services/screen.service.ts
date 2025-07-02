import { Injectable, inject } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScreenService {

  private breakpointObserver = inject(BreakpointObserver);

  public readonly isMobile$: Observable<boolean> = this.breakpointObserver
    .observe(['(min-width: 375px) and (max-width: 767px)'])
    .pipe(
      map(result => result.matches),
      shareReplay({ bufferSize: 1, refCount: true })
    );

  public readonly isTablet$: Observable<boolean> = this.breakpointObserver
    .observe(['(min-width: 768px) and (max-width: 1024px)'])
    .pipe(
      map(result => result.matches),
      shareReplay({ bufferSize: 1, refCount: true })
    );
}

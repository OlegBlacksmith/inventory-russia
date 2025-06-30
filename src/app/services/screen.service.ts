import { Injectable, inject } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScreenService {

  private breakpointObserver = inject(BreakpointObserver);

  public readonly isMobile$: Observable<boolean> = this.breakpointObserver
    .observe(['(min-width: 375px) and (max-width: 770px)'])
    .pipe(
      map(result => result.matches),
      shareReplay({ bufferSize: 1, refCount: true })
    );

  public readonly isNotMobile$: Observable<boolean> = this.breakpointObserver
    .observe(['(min-width: 771px)'])
    .pipe(
      map(result => result.matches),
      shareReplay({ bufferSize: 1, refCount: true })
    );
}
